import { _decorator, assetManager, Component, director, EventTouch, Input, input, instantiate, Label, Prefab, resources, tween, UITransform, Vec3, view, Node, Layers } from 'cc';
const {ccclass, property} = _decorator;

import Game from "./Common/Game";
import {CONSTS} from "./Common/Config";
import { BALL_STATUS } from "./Common/Enum";
import Util from "./Common/Util";
import Ball from "./Mgr/Ball";
import Barrier from "./Mgr/Barrier";

@ccclass('Main')
export default class Main extends Component {
    @property(Label)
    scoreLabel: Label | null = null
    ballArr: Ball[] = [];
    barrierArr: Barrier[] = [];
    @property([Prefab])
    barrierPrefabArr: Prefab[] = [];
    @property({type: Prefab})
    ballPrefab: Prefab | null = null
    isBouncing: boolean = false
    score: number = 0
    onLoad () {
        this.initGameData()
    }
    async initGameData() {
        try {
            // const barrierBundle = await assetManager.loadBundle('barrierPrefab');
            // const barrierAssets = await barrierBundle.load('barrierPrefab');
            // this.barrierPrefabArr = barrierAssets as Prefab[];
            this.addBarrier();
            this.addTouchEvent();
    
            // const ballBundle = await assetManager.loadBundle('ball');
            // const ballPrefab = await ballBundle.load('ball');
            // this.ballPrefab = ballPrefab as Prefab;
            this.initBall();
        } catch (err) {
            console.error(err);
        }
    }
    
    shoot(pos) {
        this.ballArr.forEach((ball, i) => {
            ball.closePhy(); 
            this.scheduleOnce(() => {
                tween(ball.node)
                .to(0.1, { position: CONSTS.ORIGIN_BALL_POS })
                .call(() => {
                    let start = ball.node.position;
                    console.log(`start: ${start}`);
                    let dir = pos.subtract(start);
                    console.log(dir);
                    ball.openPhy(dir.multiplyScalar(4)); 
                    Util.changeGroup(ball.node, BALL_STATUS.BOUNCE);
                })
                .start();
            }, i * 0.4);
        });
    }
    
    initBall() {
        if (this.ballPrefab) {
            let ballNode = instantiate(this.ballPrefab) as Node; // Instantiate the prefab
            let ball = ballNode.getComponent(Ball); // Get the Ball component
            if (ball) {
                this.node.addChild(ballNode); // Add to the scene
                ballNode.setPosition(new Vec3(CONSTS.ORIGIN_BALL_POS.x, CONSTS.ORIGIN_BALL_POS.y, CONSTS.ORIGIN_BALL_POS.z)); // Set position

                // Update group to layer (if needed, based on your conversion of changeGroup method)
                Util.changeGroup(ballNode, BALL_STATUS.UP); 

                ball.closePhy(); // Call any specific methods on Ball
                this.ballArr.push(ball); // Add to array
            }
        }
    }
    addBall(pos) {
        let ball = instantiate(this.ballPrefab).getComponent(Ball)
        this.node.addChild(ball.node)
        ball.node.position = pos
        this.ballArr.push(ball)
        Util.changeGroup(ball.node, BALL_STATUS.BOUNCE)
    }
    addTouchEvent() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
    }
    onTouchStart(e: EventTouch) {
        console.log('check');
        if (this.isBouncing) return
        this.isBouncing = true;
        let wp = e.getUILocation();
        let pos = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(wp.x, wp.y))
        this.shoot(pos)
    }
    checkCanShoot() {
//      // 也可以声明一个变量，采用计数法比较
        // const BALL_STATUS_UP_LAYER = Layers.Enum.;
        // let canShoot = this.ballArr.every(ball => ball.node.layer === BALL_STATUS.UP);
        // if (canShoot) {
        // this.barrierArr.forEach(b => {
        // b.node.x += 150
        // })
        // this.addBarrier()
        // this.checkIsOver() ? this.replay() : this.isBouncing = false
        // }
    }
    replay() {
        this.removeAllBarrier()
        this.removeAllBall()
        this.barrierArr = []
        this.ballArr = []
        this.addBarrier()
        this.initBall()
        this.isBouncing = false
        this.score = 0
        this.setScoreLabel()
    }
    removeAllBarrier() {
        this.barrierArr.forEach(b => b.node.destroy())
    }
    removeAllBall() {
        this.ballArr.forEach(b => b.node.destroy())
    }
    checkIsOver() {
        // return this.barrierArr.some(b => b.node.y > CONSTS.ORIGIN_BALL_POS.y)
    }
    addBarrier() {
        let margin = 130;
        let x = -CONSTS.SCREEN_W / 2 + margin;
        console.log(CONSTS.SCREEN_W / 2);
        console.log(x);
        while (x < CONSTS.SCREEN_W / 2 - margin) {
            let y = -CONSTS.SCREEN_H / 2 + CONSTS.BARRIER_H + Util.random(-60, 60);
            let gap = Util.random(100, 300);
            let barrierPrefab = this.barrierPrefabArr[Util.random(0, this.barrierPrefabArr.length - 1)];
            console.log(barrierPrefab);
            let barrierNode = instantiate(barrierPrefab) as Node;
            let barrier = barrierNode.getComponent(Barrier) as Barrier;

            this.node.addChild(barrierNode);
            barrierNode.setPosition(x, y);

            this.barrierArr.push(barrier);
            x += gap;
        }
    }
    setScoreLabel() {
        this.scoreLabel.string = String(this.score)
    }
    addScore() {
        this.score++
        this.setScoreLabel()
    }
    removeBarrier(barrier: Barrier) {
        let idx = this.barrierArr.indexOf(barrier);
        if (idx >= 0) {
            this.barrierArr.splice(idx, 1);
            barrier.node.removeFromParent(); 
        }
    }
    onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
    }
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import Game from "./Common/Game";
// import {CONSTS} from "./Common/Config";
// import { BALL_STATUS } from "./Common/Enum";
// import Util from "./Common/Util";
// import Ball from "./Mgr/Ball";
// import Barrier from "./Mgr/Barrier";

// const {ccclass, property} = cc._decorator;

// @ccclass
// export default class Main extends cc.Component {

//     @property(cc.Label)
//     scoreLabel: cc.Label = null

//     ballArr: Ball[] = []
//     barrierArr: Barrier[] = []
//     barrierPrefabArr: cc.Prefab[] = []
//     ballPrefab: cc.Prefab = null

//     isBouncing: boolean = false
//     score: number = 0

//     onLoad () {
//       this.initGameData()
//     }

    // initGameData() {
    //   Game.curLevel = 1
    //   Game.mgr = this
    //   CONSTS.SCREEN_W = cc.winSize.width
    //   CONSTS.SCREEN_H = cc.winSize.height
    //   cc.loader.loadResDir('barrierPrefab', (err, assets) => {
    //     if (err) console.log(err)
    //     this.barrierPrefabArr = assets
    //     this.addBarrier()
    //     this.addTouchEvent()
    //   })
    //   cc.loader.loadRes('ball', (err, prefab) => {
    //     if (err) console.log(err)
    //     this.ballPrefab = prefab
    //     this.initBall()
    //   })
    // }

    // shoot(pos) {
    //   this.ballArr.forEach((ball, i) => {
    //     ball.closePhy()
    //     this.scheduleOnce(() => {
    //       cc.tween(ball.node)
    //       .to(0.1, { position: CONSTS.ORIGIN_BALL_POS })
    //       .call(() => {
    //           let start = ball.node.position
    //           let dir = pos.sub(start)
    //           ball.openPhy(dir.mul(4))
    //           Util.changeGroup(ball.node, BALL_STATUS.BOUNCE)
    //       })
    //       .start()
    //     }, i * 0.4)
    //   })
    // }

    // initBall() {
    //   let ball = cc.instantiate(this.ballPrefab).getComponent(Ball)
    //   this.node.addChild(ball.node)
    //   ball.node.position = CONSTS.ORIGIN_BALL_POS
    //   Util.changeGroup(ball.node, BALL_STATUS.UP)
    //   ball.closePhy()
    //   this.ballArr.push(ball)
    // }

//     addBall(pos) {
//       let ball = cc.instantiate(this.ballPrefab).getComponent(Ball)
//       this.node.addChild(ball.node)
//       ball.node.position = pos
//       this.ballArr.push(ball)
//       Util.changeGroup(ball.node, BALL_STATUS.BOUNCE)
//     }

//     addTouchEvent() {
//       this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
//     }

//     onTouchStart(e) {
//       if (this.isBouncing) return
//       this.isBouncing = true
//       let pos = this.node.convertToNodeSpaceAR(e.getLocation())
//       this.shoot(pos)
//     }

//     checkCanShoot() {
//       // 也可以声明一个变量，采用计数法比较
//       let canShoot = this.ballArr.every(ball => ball.node.group === BALL_STATUS.UP)
//       if (canShoot) {
//         this.barrierArr.forEach(b => {
//           b.node.y += 150
//         })
//         this.addBarrier()
//         this.checkIsOver() ? this.replay() : this.isBouncing = false
//       }
//     }

//     replay() {
//       this.removeAllBarrier()
//       this.removeAllBall()
//       this.barrierArr = []
//       this.ballArr = []
//       this.addBarrier()
//       this.initBall()
//       this.isBouncing = false
//       this.score = 0
//       this.setScoreLabel()
//     }

//     removeAllBarrier() {
//       this.barrierArr.forEach(b => b.node.destroy())
//     }

//     removeAllBall() {
//       this.ballArr.forEach(b => b.node.destroy())
//     }

//     checkIsOver() {
//       return this.barrierArr.some(b => b.node.y > CONSTS.ORIGIN_BALL_POS.y)
//     }

//     addBarrier() {
//       let margin = 130
//       let x = - CONSTS.SCREEN_W / 2 + margin
//       while(x < CONSTS.SCREEN_W / 2 - margin) {
//         let y = -CONSTS.SCREEN_H / 2 + CONSTS.BARRIER_H + Util.random(-60, 60)
//         let gap = Util.random(100, 300)
//         let barrier = cc.instantiate(this.barrierPrefabArr[Util.random(0, this.barrierPrefabArr.length - 1)]).getComponent(Barrier)
//         this.node.addChild(barrier.node)
//         barrier.node.x = x
//         barrier.node.y = y
//         this.barrierArr.push(barrier)
//         x += gap
//       }
//     }

//     setScoreLabel() {
//       this.scoreLabel.string = String(this.score)
//     }
//     addScore() {
//       this.score++
//       this.setScoreLabel()
//     }

//     removeBarrier(barrier: Barrier) {
//       let idx = this.barrierArr.indexOf(barrier)
//       if (idx >= 0) {
//         this.barrierArr.splice(idx, 1)
//         barrier.node.removeFromParent(false)
//       }
//     }

//     onDestroy() {
//       this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
//     }
// }
