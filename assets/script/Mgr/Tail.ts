import { _decorator, Component, Label } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('Tail')
export default class NewClass extends Component {
    @property(Label)
    label: Label | null = null;
    onLoad () {}
//    // update (dt) {}
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class NewClass extends cc.Component {
// 
//     @property(cc.Label)
//     label: cc.Label = null;
// 
//     onLoad () {}
// 
//     // update (dt) {}
// }
