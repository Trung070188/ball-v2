import { _decorator, Node } from 'cc';
export default class Util {
//  /**
//   * 获取 [min, max] 之间的随机数，包括两端
//   * @param min 最小值
//   * @param max 最大值
//   */
  static random(min: number, max: number): number {
        return Math.floor(Math.random() * Math.abs(max - min + 1)) + min
  }
//  /**
//   * 设置节点的碰撞分组名称
//   * @param node 节点
//   * @param groupName 分组名称
//   */
  static changeGroup(node: Node, groupName: string) {
        // node.active = false
        // node.group = groupName
        // node.active = true
  }
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// export default class Util {
//   /**
//    * 获取 [min, max] 之间的随机数，包括两端
//    * @param min 最小值
//    * @param max 最大值
//    */
//   static random(min: number, max: number): number {
//     return Math.floor(Math.random() * Math.abs(max - min + 1)) + min
//   }
//   /**
//    * 设置节点的碰撞分组名称
//    * @param node 节点
//    * @param groupName 分组名称
//    */
//   static changeGroup(node: cc.Node, groupName: string) {
//     node.active = false
//     node.group = groupName
//     node.active = true
//   }
// }
