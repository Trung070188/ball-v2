import { _decorator, Component, Label } from 'cc';
const {ccclass, property} = _decorator;

import Game from "../Common/Game";
import Util from "../Common/Util";

@ccclass('Barrier')
export default class Barrier extends Component {
    @property(Label)
    label: Label | null = null
    @property(Boolean)
    isAddType: boolean = false
    num: number = 0
    isDie: boolean = false
    onLoad () {
        if (this.isAddType) return
        this.initNum()
        this.initAngle()
    }
    initNum() {
        this.num = Util.random(5, 20)
        this.setNum(this.num)
    }
    initAngle() {
        this.node.angle = Util.random(0, 180)
        this.label.node.angle = -this.node.angle
    }
    setNum(num) {
        this.label.getComponent(Label).string = String(num)
    }
    handleNormalBarrier() {
        this.num--
        Game.mgr.addScore()
        if (this.num > 0) {
        this.setNum(this.num)
        } else {
        this.isDie = true
        Game.mgr.removeBarrier(this)
        }
    }
    handleAddTypeBarrier() {
//      // 对于只碰撞一次的小球可以把 sensor 开关打开，只发生碰撞回调，并不产生实际碰撞
        this.isDie = true
        let pos = this.node.position
        Game.mgr.removeBarrier(this)
        Game.mgr.addBall(pos)
    }
    onBeginContact (contact, selfCollider, otherCollider) {
        if (this.isDie) return
        this.isAddType ? this.handleAddTypeBarrier() : this.handleNormalBarrier()
    }
//    // update (dt) {}
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import Game from "../Common/Game";
// import Util from "../Common/Util";
// 
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class Barrier extends cc.Component {
// 
//     @property(cc.Label)
//     label: cc.Label = null
//     @property(Boolean)
//     isAddType: boolean = false
// 
//     num: number = 0
//     isDie: boolean = false
// 
//     onLoad () {
//       if (this.isAddType) return
//       this.initNum()
//       this.initAngle()
//     }
// 
//     initNum() {
//       this.num = Util.random(5, 20)
//       this.setNum(this.num)
//     }
// 
//     initAngle() {
//       this.node.angle = Util.random(0, 180)
//       this.label.node.angle = -this.node.angle
//     }
// 
//     setNum(num) {
//       this.label.getComponent(cc.Label).string = String(num)
//     }
// 
//     handleNormalBarrier() {
//       this.num--
//       Game.mgr.addScore()
//       if (this.num > 0) {
//         this.setNum(this.num)
//       } else {
//         this.isDie = true
//         Game.mgr.removeBarrier(this)
//       }
//     }
// 
//     handleAddTypeBarrier() {
//       // 对于只碰撞一次的小球可以把 sensor 开关打开，只发生碰撞回调，并不产生实际碰撞
//       this.isDie = true
//       let pos = this.node.position
//       Game.mgr.removeBarrier(this)
//       Game.mgr.addBall(pos)
//     }
// 
//     onBeginContact (contact, selfCollider, otherCollider) {
//       if (this.isDie) return
//       this.isAddType ? this.handleAddTypeBarrier() : this.handleNormalBarrier()
//     }
//     // update (dt) {}
// }
