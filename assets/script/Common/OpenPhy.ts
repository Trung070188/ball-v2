import { _decorator, Component, Vec2, v2 } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('OpenPhy')
export default class openPhy extends Component {
    @property(Vec2)
    gravity: Vec2 = v2(0, -320) // 引擎默认重力
    @property
    isDebug: boolean = false
    onLoad () {
//      // 只能在 onload 这个阶段打开物理引擎，并且得在一开始就打开，也就是挂载在根组件下
        // let phyMgr = cc.director.getPhysicsManager()
        // phyMgr.enabled = true
        // phyMgr.gravity = this.gravity
        // console.log('打开了物理引擎')
        // if (this.isDebug) {
        // console.log('打开了物理引擎的调试模式')
        // let DrawBits: any = cc.PhysicsManager.DrawBits;
        // phyMgr.debugDrawFlags = DrawBits.e_aabbBit |
        // DrawBits.e_pairBit |
        // DrawBits.e_centerOfMassBit |
        // DrawBits.e_jointBit |
        // DrawBits.e_shapeBit;
        // } else {
        // phyMgr.debugDrawFlags = 0
        // }
    }
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class openPhy extends cc.Component {
// 
//     @property(cc.Vec2)
//     gravity: cc.Vec2 = cc.v2(0, -320) // 引擎默认重力
//     @property
//     isDebug: boolean = false
// 
//     onLoad () {
//       // 只能在 onload 这个阶段打开物理引擎，并且得在一开始就打开，也就是挂载在根组件下
//       let phyMgr = cc.director.getPhysicsManager()
//       phyMgr.enabled = true
//       phyMgr.gravity = this.gravity
//       console.log('打开了物理引擎')
//       if (this.isDebug) {
//         console.log('打开了物理引擎的调试模式')
//         let DrawBits: any = cc.PhysicsManager.DrawBits;
//         phyMgr.debugDrawFlags = DrawBits.e_aabbBit |
//         DrawBits.e_pairBit |
//         DrawBits.e_centerOfMassBit |
//         DrawBits.e_jointBit |
//         DrawBits.e_shapeBit;
//       } else {
//         phyMgr.debugDrawFlags = 0
//       }
//     }
// }
