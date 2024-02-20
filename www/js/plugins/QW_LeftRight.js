//=============================================================================
// QW_LeftRight.js  2017/03/10
//=============================================================================

/*:
 * @plugindesc changekeyQW→LR
 * @help No,plugincommand
 * デフォルトのステータス画面とスキル画面でキャラ切り替え時
 * QWではなく左右キーで変えるようになる感じのやつ
 * 装備画面はデフォルトだとすでに別の操作で左右が割り当てられてるから
 * 一旦コメントアウトしてる（だからこのままだと装備画面だけQW操作っていう）
 * 外す（機能させる）場合は57行目と70行目の/と*を消す
 * ってヘルプに書いちゃった／(^o^)＼
 */

(function (_global) {
  Window_Selectable.prototype.processHandling = function () {
    if (this.isOpenAndActive()) {
      if (this.isOkEnabled() && this.isOkTriggered()) {
        this.processOk();
      } else if (this.isCancelEnabled() && this.isCancelTriggered()) {
        this.processCancel();
      } else if (this.isHandled("right") && Input.isTriggered("right")) {
        this.processPagedown();
      } else if (this.isHandled("left") && Input.isTriggered("left")) {
        this.processPageup();
      }
    }
  };

  Window_Selectable.prototype.processPageup = function () {
    SoundManager.playCursor();
    this.updateInputData();
    this.deactivate();
    this.callHandler("left");
  };

  Window_Selectable.prototype.processPagedown = function () {
    SoundManager.playCursor();
    this.updateInputData();
    this.deactivate();
    this.callHandler("right");
  };

  Scene_Skill.prototype.createSkillTypeWindow = function () {
    var wy = this._helpWindow.height;
    this._skillTypeWindow = new Window_SkillType(0, wy);
    this._skillTypeWindow.setHelpWindow(this._helpWindow);
    this._skillTypeWindow.setHandler("skill", this.commandSkill.bind(this));
    this._skillTypeWindow.setHandler("cancel", this.popScene.bind(this));
    this._skillTypeWindow.setHandler("right", this.nextActor.bind(this));
    this._skillTypeWindow.setHandler("left", this.previousActor.bind(this));
    this.addWindow(this._skillTypeWindow);
  };

  /*Scene_Equip.prototype.createCommandWindow = function() {
    var wx = this._statusWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - this._statusWindow.width;
    this._commandWindow = new Window_EquipCommand(wx, wy, ww);
    this._commandWindow.setHelpWindow(this._helpWindow);
    this._commandWindow.setHandler('equip',    this.commandEquip.bind(this));
    this._commandWindow.setHandler('optimize', this.commandOptimize.bind(this));
    this._commandWindow.setHandler('clear',    this.commandClear.bind(this));
    this._commandWindow.setHandler('cancel',   this.popScene.bind(this));
    this._commandWindow.setHandler('right', this.nextActor.bind(this));
    this._commandWindow.setHandler('left',   this.previousActor.bind(this));
    this.addWindow(this._commandWindow);
};*/

  Scene_Status.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this._statusWindow = new Window_Status();
    this._statusWindow.setHandler("cancel", this.popScene.bind(this));
    this._statusWindow.setHandler("right", this.nextActor.bind(this));
    this._statusWindow.setHandler("left", this.previousActor.bind(this));
    this.addWindow(this._statusWindow);
    this.refreshActor();
  };
})(this);
