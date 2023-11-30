import { _decorator, CircleCollider2D, Component, Contact2DType, IPhysics2DContact, RigidBody, RigidBody2D, tween, UITransform, v2, v3, Vec2, Vec3 } from 'cc';
const {ccclass, property} = _decorator;

import {CONSTS} from "../Common/Config";
import Util from "../Common/Util";
import Game from "../Common/Game";
import { BALL_STATUS } from "../Common/Enum";

@ccclass('Ball')
export default class Ball extends Component {
    rigidBody: RigidBody2D | null = null
    hitGround: boolean = false
    start() {
        let collider = this.getComponent(CircleCollider2D);
        if(collider !== null)
        {
        //  collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        this.rigidBody = this.getComponent(RigidBody2D)
    }
    openPhy(linearVelocity: Vec2) {
        console.log(linearVelocity);
        debugger;
      if (!this.rigidBody) this.rigidBody = this.getComponent(RigidBody2D)
      this.rigidBody.enabled = true
      this.rigidBody.linearVelocity = linearVelocity
    }

    closePhy() {
        if (!this.rigidBody) this.rigidBody = this.node.getComponent(RigidBody2D);
        this.rigidBody.enabled = false; 
        this.rigidBody.linearVelocity = Vec2.ZERO; 
    }
    
    onBeginContact (selfCollider: CircleCollider2D, otherCollider: CircleCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name === 'ground') this.hitGround = true
    }
    checkIsSleep() {
        if (this.node.parent.name === BALL_STATUS.UP) return
        let l = this.rigidBody.linearVelocity.length();
     // 弹的过程中可能停住了，需要判断一下，随便给个向上的初速度
        if (l <= 0.0000001) this.rigidBody.linearVelocity = v2( Math.random() > 0.5 ? 100 : -100, 500)
    }
    update (dt) {
        // this.checkIsSleep();
        // if (!this.hitGround) return;
        // this.hitGround = false;
        // this.closePhy();
        // let dir = this.node.position.x > 0 ? 1 : -1;
        // let pos1 = this.node.position.clone();
        // let pos3 = v3(dir * (CONSTS.SCREEN_W / 2 - this.node.getComponent(UITransform).width / 2), -CONSTS.SCREEN_H / 2 + CONSTS.GROUND_H + this.node.getComponent(UITransform).height / 2);
        // let pos2 = pos1.add(pos3).divide(new Vec3(2,2,2));
        // pos2.y = pos1.y + 10;

        // tween(this.node)
        // .then(
        //     tween().to(0.2, { position: pos3, bezier: true })
        // )
        // .to(0.4, { position: v3(dir * (CONSTS.SCREEN_W / 2 - this.node.getComponent(UITransform).width / 2), CONSTS.SCREEN_H / 2 - 30) })
        // .to(0.2, { position: v3(dir * (CONSTS.SCREEN_W / 2 - 200), CONSTS.SCREEN_H / 2 - 100) })
        // .call(() => {
        //     Util.changeGroup(this.node, BALL_STATUS.UP);
        //     this.openPhy(v2(0, 0));
        //     Game.mgr.checkCanShoot();
        // })
        // .start();

    }
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import {CONSTS} from "../Common/Config";
// import Util from "../Common/Util";
// import Game from "../Common/Game";
// import { BALL_STATUS } from "../Common/Enum";
// 
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class Ball extends cc.Component {
// 
//     rigidBody: cc.RigidBody = null
//     hitGround: boolean = false
// 
//     start() {
//       this.rigidBody = this.getComponent(cc.RigidBody)
//     }
// 
//     closePhy() {
//       if (!this.rigidBody) this.rigidBody = this.getComponent(cc.RigidBody)
//       this.rigidBody.active = false
//       this.rigidBody.linearVelocity = cc.Vec2.ZERO
//     }
// 
//     openPhy(linearVelocity: cc.Vec2) {
//       if (!this.rigidBody) this.rigidBody = this.getComponent(cc.RigidBody)
//       this.rigidBody.active = true
//       this.rigidBody.linearVelocity = linearVelocity
//     }
// 
//     onBeginContact (contact, selfCollider, otherCollider) {
//       // 碰撞到地面之后无法立即直接将 rigidBody 禁用掉，可能会影响当前碰撞后的其他操作，需要在下次更新中改动
//       if (otherCollider.node.name === 'ground') this.hitGround = true
//     }
// 
//     checkIsSleep() {
//       if (this.node.group === BALL_STATUS.UP) return
//       let l = this.rigidBody.linearVelocity.mag();
//       console.log(`l: ${l}`)
//       // 弹的过程中可能停住了，需要判断一下，随便给个向上的初速度
//       if (l <= 0.0000001) this.rigidBody.linearVelocity = cc.v2( Math.random() > 0.5 ? 100 : -100, 500)
//     }
// 
//     update (dt) {
//       this.checkIsSleep()
//       if (!this.hitGround) return
//       this.hitGround = false
//       this.closePhy()
//       let dir = this.node.x > 0 ? 1 : -1
//       let pos1 = this.node.position
//       let pos3 = cc.v2(dir * (CONSTS.SCREEN_W/2 - this.node.width/2), - CONSTS.SCREEN_H/2 + CONSTS.GROUND_H + this.node.height/2)
//       let pos2 = pos1.add(pos3).divSelf(2)
//       pos2.y = pos1.y + 10
//       cc.tween(this.node)
//         .then(cc.bezierTo(0.2, [pos1, pos2, pos3]))
//         .to(.4, { position: cc.v2(dir * (CONSTS.SCREEN_W/2 - this.node.width/2), CONSTS.SCREEN_H/2 - 30) })
//         .to(.2, { position: cc.v2(dir * (CONSTS.SCREEN_W/2 - 200), CONSTS.SCREEN_H/2 - 100 ) })
//         .call(() => {
//           Util.changeGroup(this.node, BALL_STATUS.UP)
//           this.openPhy(cc.v2(0, 0))
//           Game.mgr.checkCanShoot()
//         })
//         .start()
//     }
// }
