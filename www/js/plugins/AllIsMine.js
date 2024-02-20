//=============================================================================
// AllIsMine.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.3 2017/07/24 オフセットにマイナスの値を設定できるように変更。
// 1.0.2 2017/07/19 SE設定機能を追加。
// 1.0.1 2017/07/17 吹き出しの表示・非表示をスイッチでも切り替えられるように変更。
// 1.0.0 2017/07/17 公開。
// ----------------------------------------------------------------------------
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This plugin display baloon when picking up item.
 * @author Tsumio
 *
 * @param ----Baloon Settings----
 * @desc
 * @default
 *
 * @param BaloonSwitchNum
 * @type switch
 * @desc When this switch is ON, baloon window is displayed.
 * @default 101
 *
 * @param BaloonImage
 * @type file
 * @require 1
 * @desc Sets the image of the balloon window. （Load 'img\system' folder）
 * @dir img/system
 * @default Window
 *
 * @param OffSetX
 * @type number
 * @min -1000
 * @max 1000
 * @desc This is a setting sets the offset of X position.
 * @default 0
 *
 * @param OffSetY
 * @type number
 * @min -1000
 * @max 1000
 * @desc This is a setting sets the offset of Y position.
 * @default 0
 *
 * @param BaloonWindowMargin
 * @type number
 * @desc This is a setting sets the margin inside the baloon window.
 * @default 35
 *
 * @param WaitTime
 * @type number
 * @desc This is a setting time to display the next item.60 = about 1 minute。
 * @default 60
 *
 * @param ----String To Display----
 * @desc
 * @default
 *
 * @param ItemNameColor
 * @type number
 * @desc This is a setting sets color of obtained item(or gold etc.).The color follows to the contents of BaloonImage.
 * @default 1
 *
 * @param WhenPickUpGold
 * @type string
 * @desc Display string when gold is picked up.
 * @default Picked Up !
 *
 * @param GoldIconNum
 * @type number
 * @desc This is a setting sets the number of gold icon.
 * @default 314
 *
 * @param WhenGetItem
 * @type string
 * @desc Display string when item is geted.
 * @default Got
 *
 * @param ----SE Settings----
 * @desc
 * @default
 *
 * @param GoldSeName
 * @desc The filename of the SE when you pick up gold.
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param GoldSeVolume
 * @type number
 * @desc This is a setting sets the volume when you picu up gold.
 * @default 100
 *
 * @param GoldSePitch
 * @type number
 * @desc This is a setting sets the pitch when you picu up gold.
 * @default 100
 *
 * @param WeaponSeName
 * @desc The filename of the SE when you get weapon(s).
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param WeaponSeVolume
 * @type number
 * @desc This is a setting sets the volume when you get weapon(s).
 * @default 100
 *
 * @param WeaponSePitch
 * @type number
 * @desc This is a setting sets the pitch when you get weapon(s).
 * @default 100
 *
 * @param ArmorSeName
 * @desc The filename of the SE when you get armor(s).
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param ArmorSeVolume
 * @type number
 * @desc This is a setting sets the volume when you get armor(s).
 * @default 100
 *
 * @param ArmorSePitch
 * @type number
 * @desc This is a setting sets the pitch when you get armor(s).
 * @default 100
 *
 * @param ItemSeName
 * @desc The filename of the SE when you get item(s).
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param ItemSeVolume
 * @type number
 * @desc This is a setting sets the volume when you get item(s).
 * @default 100
 *
 * @param ItemSePitch
 * @type number
 * @desc This is a setting sets the pitch when you get item(s).
 * @default 100
 *
 * @param ----Others----
 * @desc
 * @default
 *
 * @param EnglishMode
 * @type boolean
 * @desc If you use English, you should set 'true'.
 * @default true
 *
 * @help This plugin shows baloon window when player get a item(or gold etc.) from from event command.
 * In the baloon window, the item name, icon, number of items, etc. are displayed.
 * You can toggle display and non-display of baloon window by using the plugin command or using switch operation of the event command..
 *
 * ----how to use----
 * The initial value of this plugin is "Stop_AllIsMine".
 * So, if you want to display the balloon, you should make sure "Start_AllIsMine" from the plugin command.
 * Or you need to turn on the switch with the specified number (initial value: 101) by switch operation of the event command.
 * Note : Although plugin commands are left for compatibility, I recommend using switch operation of the event command.
 *
 * ----when to play se----
 * SE is played when balloon window is displayed.
 * In other words,even if the player gets items and equipments at the same time,
 * SE are played one by one at the timing of balloon window switching so that no sounds are played simultaneously.
 * It is ears-friendly specification.
 *
 * ----plugin command----
 * Start_AllIsMine         #Show baloon window when get a item.
 * Stop_AllIsMine          #Don't show baloon window when get a item.
 *
 * ----acknowledgments----
 * TinyGetInfoWnd maked by Sasuke KANNAZUKI &
 * MessageWindowPopup maked by Triacontane provided inspiration to this plugin.
 * Tnaks !
 *
 */
/*:ja
 * @plugindesc アイテム等を入手したときに吹き出しを表示させます
 * @author ツミオ
 *
 *
 *
 * @param ----吹き出しの設定----
 * @desc
 * @default
 *
 * @param 吹き出しのスイッチ番号
 * @type switch
 * @desc このスイッチがONのときに吹き出しが表示されます。
 * @default 101
 *
 * @param 吹き出しの画像
 * @type file
 * @require 1
 * @desc 吹き出しウィンドウの画像を設定します。（img\systemフォルダから読み込み）
 * @dir img/system
 * @default Window
 *
 * @param X座標のオフセット
 * @type number
 * @min -1000
 * @max 1000
 * @desc X座標のオフセットを設定します。
 * @default 0
 *
 * @param Y座標のオフセット
 * @type number
 * @min -1000
 * @max 1000
 * @desc Y座標のオフセットを設定します。
 * @default 0
 *
 * @param 吹き出しの余白
 * @type number
 * @desc 吹き出しウィンドウの内側の余白を設定します。
 * @default 30
 *
 * @param 表示時間
 * @type number
 * @desc 次のアイテムを表示するまでの時間を設定します。60 = 約1秒。
 * @default 60
 *
 * @param ----表示する文字----
 * @desc
 * @default
 *
 *
 * @param アイテム名の色
 * @type number
 * @desc 入手したアイテム名（やゴールド等）の色を設定します。文字色は吹き出しの画像の内容に準じます。
 * @default 1
 *
 * @param ゴールド取得時の表示文字列
 * @type string
 * @desc ゴールドを取得した時に表示する文字列を設定します。
 * @default 拾った！
 *
 * @param ゴールドのアイコン番号
 * @type number
 * @desc ゴールドのアイコン番号を設定します。
 * @default 314
 *
 * @param アイテム取得時の表示文字列
 * @type string
 * @desc アイテムを取得した時に表示する文字列を設定します。
 * @default 個手に入れた！
 *
 *
 * @param ----SEの設定----
 * @desc
 * @default
 *
 * @param ゴールド入手時のSE名
 * @desc ゴールドを取得した時に再生されるSEのファイル名を設定します。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param ゴールド取得時のSE音量
 * @type number
 * @desc ゴールドを取得した時に再生されるSEの音量を設定します。
 * @default 100
 *
 * @param ゴールド取得時のSEピッチ
 * @type number
 * @desc ゴールドを取得した時に再生されるSEのピッチを設定します。
 * @default 100
 *
 * @param 武器取得時のSE名
 * @desc 武器を取得した時に再生されるSEのファイル名を設定します。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param 武器取得時のSE音量
 * @type number
 * @desc 武器を取得した時に再生されるSEの音量を設定します。
 * @default 100
 *
 * @param 武器取得時のSEピッチ
 * @type number
 * @desc 武器を取得した時に再生されるSEのピッチを設定します。
 * @default 100
 *
 * @param 防具取得時のSE名
 * @desc 防具を取得した時に再生されるSEのファイル名を設定します。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param 防具取得時のSE音量
 * @type number
 * @desc 防具を取得した時に再生されるSEの音量を設定します。
 * @default 100
 *
 * @param 防具取得時のSEピッチ
 * @type number
 * @desc 防具を取得した時に再生されるSEのピッチを設定します。
 * @default 100
 *
 * @param アイテム取得時のSE名
 * @desc アイテムを取得した時に再生されるSEのファイル名を設定します。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param アイテム取得時のSE音量
 * @type number
 * @desc アイテムを取得した時に再生されるSEの音量を設定します。
 * @default 100
 *
 * @param アイテム取得時のSEピッチ
 * @type number
 * @desc アイテムを取得した時に再生されるSEのピッチを設定します。
 * @default 100
 *
 * @param ----その他----
 * @desc
 * @default
 *
 * @param 英語モード
 * @type boolean
 * @desc 英語での表示を前提とした表示にします。
 * @default false
 *
 * @help このプラグインを導入すると、イベントコマンドからアイテムやゴールドを入手したときに、
 * 吹き出しを表示させることができるようになります。
 * 吹き出しにはアイテムの名前やアイコン、個数などが表示されます。
 * プラグインコマンド、もしくはスイッチを操作することにより、吹き出しの表示・非表示が切り替えられます。
 *
 * 【使用方法】
 * このプラグインの初期値は「Stop_AllIsMine」です。
 * つまり、吹き出しを表示させたい場合、必ずプラグインコマンドから「Start_AllIsMine」させる必要があります。
 * もしくは、イベントのスイッチ操作で、指定された番号のスイッチ（初期値：101）をONにする必要があります。
 * 注＊互換性のためにプラグインコマンドを残していますが、基本的にはイベントでスイッチを操作することをオススメします。
 *
 *【SE再生のタイミング】
 * SEは「吹き出しが表示されたとき」に流されます。
 * つまり、複数のアイテムや装備を同時に入手した場合も、SEは吹き出しが切り替わるタイミングで一つ一つ流されるため、
 * いくつもの音が同時に鳴ることはありません。
 * 耳に優しい仕様です。
 *
 * 【プラグインコマンド】
 * Start_AllIsMine         #アイテム入手時に吹き出しを表示するようにします。
 * Stop_AllIsMine          #アイテム入手時に吹き出しを表示しないようにします。
 *
 * 【謝辞】
 * このプラグインは神無月サスケさんの「TinyGetInfoWnd」と
 * トリアコンタンさんの「フキダシウィンドウプラグイン」に着想を得て作成しました。
 * 感謝！
 *
 * 利用規約：
 * 作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 * についても制限はありません。
 * 自由に使用してください。
 */

(function () {
  "use strict";
  var pluginName = "AllIsMine";

  //Declare NTMO namespace.
  var NTMO = NTMO || {};
  //Create se type(enum).
  NTMO.SE_TYPE = {
    Gold: 1,
    Weapon: 2,
    Armor: 3,
    Item: 4,
  };

  //-----------------------------------------------------------------------------
  // Settings for plugin command.
  //-----------------------------------------------------------------------------
  var _Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "Stop_AllIsMine") {
      NTMO.Queue.stopQueue();
    } else if (command === "Start_AllIsMine") {
      NTMO.Queue.startQueue();
    }
  };

  //=============================================================================
  // Local function
  //  These functions checks & formats pluguin's command parameters.
  //  I borrowed these functions from Triacontane.Thanks!
  //=============================================================================
  var getParamString = function (paramNames) {
    if (!Array.isArray(paramNames)) paramNames = [paramNames];
    for (var i = 0; i < paramNames.length; i++) {
      var name = PluginManager.parameters(pluginName)[paramNames[i]];
      if (name) return name;
    }
    return "";
  };

  var getParamNumber = function (paramNames, min, max) {
    var value = getParamString(paramNames);
    if (arguments.length < 2) min = -Infinity;
    if (arguments.length < 3) max = Infinity;
    return (parseInt(value) || 0).clamp(min, max);
  };

  //=============================================================================
  // Get and set pluguin parameters.
  //=============================================================================
  var param = {};
  param.pickUpGold = getParamString([
    "WhenPickUpGold",
    "ゴールド取得時の表示文字列",
  ]);
  param.offsetX = getParamNumber(["OffSetX", "X座標のオフセット"]);
  param.offsetY = getParamNumber(["OffSetY", "Y座標のオフセット"]);
  param.imgWindowName = getParamString(["BaloonImage", "吹き出しの画像"]);
  param.goldIconNum = getParamString(["GoldIconNum", "ゴールドのアイコン番号"]);
  param.windowMargin = getParamNumber(["BaloonWindowMargin", "吹き出しの余白"]);
  param.waitTime = getParamNumber(["WaitTime", "表示時間"]);
  param.itemNameColor = getParamNumber(["ItemNameColor", "アイテム名の色"]);
  param.gettingItemStr = getParamString([
    "WhenGetItem",
    "アイテム取得時の表示文字列",
  ]);
  param.englishMode = getParamString(["EnglishMode", "英語モード"]);
  param.visibleSwitch = getParamNumber([
    "BaloonSwitchNum",
    "吹き出しのスイッチ番号",
  ]);
  //Gold SE settings.
  param.goldSeName = getParamString(["GoldSeName", "ゴールド入手時のSE名"]);
  param.goldSeVolume = getParamString([
    "GoldSeVolume",
    "ゴールド取得時のSE音量",
  ]);
  param.goldSePitch = getParamString([
    "GoldSePitch",
    "ゴールド取得時のSEピッチ",
  ]);
  //Weapon SE settings.
  param.weaponSeName = getParamString(["WeaponSeName", "武器取得時のSE名"]);
  param.weaponSeVolume = getParamString([
    "WeaponSeVolume",
    "武器取得時のSE音量",
  ]);
  param.weaponSePitch = getParamString([
    "WeaponSePitch",
    "武器取得時のSEピッチ",
  ]);
  //Armor SE settings.
  param.armorSeName = getParamString(["ArmorSeName", "防具取得時のSE名"]);
  param.armorSeVolume = getParamString(["ArmorSeVolume", "防具取得時のSE音量"]);
  param.armorSePitch = getParamString(["ArmorSePitch", "防具取得時のSEピッチ"]);
  //Item SE settings.
  param.itemSeName = getParamString(["ItemSeName", "アイテム取得時のSE名"]);
  param.itemSeVolume = getParamString([
    "ItemSeVolume",
    "アイテム取得時のSE音量",
  ]);
  param.itemSePitch = getParamString([
    "ItemSePitch",
    "アイテム取得時のSEピッチ",
  ]);

  //=============================================================================
  // NTMO.Queue(static)
  //  This is a class that implement the queue.
  //  I borrowed this class from http://keicode.com/script/scr25.php. Thanks!
  //=============================================================================
  NTMO.Queue = function () {
    this._arry = new Array();
    this._type = new Array();
  };

  NTMO.Queue.initialize = function () {
    if (this._arry === undefined) {
      this._arry = new Array();
      this._type = new Array();
    }
  };

  NTMO.Queue.enqueue = function (o, type) {
    if (this.canUseQueue()) {
      this._arry.push(o);
      this._type.push(type);
    }
  };

  NTMO.Queue.dequeue = function () {
    if (this._arry.length > 0) {
      return this._arry.shift();
    }
    return null;
  };

  NTMO.Queue.dequeueType = function () {
    if (this._type.length > 0) {
      return this._type.shift();
    }
    return null;
  };

  NTMO.Queue.size = function () {
    return this._arry.length;
  };

  NTMO.Queue.toString = function () {
    return "[" + this._arry.join(",") + "]";
  };

  NTMO.Queue.canUseQueue = function (o) {
    return $gameSwitches.value(param.visibleSwitch);
  };

  NTMO.Queue.startQueue = function (o) {
    $gameSwitches.setValue(param.visibleSwitch, true);
  };

  NTMO.Queue.stopQueue = function (o) {
    $gameSwitches.setValue(param.visibleSwitch, false);
  };

  //=============================================================================
  // Scene_Map
  //  Expand Scene_Map class for displaying Window_AllIsMine.
  //=============================================================================
  var _Scene_map_createDisplayObjects =
    Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function () {
    _Scene_map_createDisplayObjects.call(this);
    this.createWindowAllIsMine();
  };

  Scene_Map.prototype.createWindowAllIsMine = function () {
    this._window_allMine = new Window_AllIsMine(
      -100,
      -2000,
      Graphics.width,
      100
    );
    this.addWindow(this._window_allMine);
  };

  //=============================================================================
  // Window_AllIsMine
  //  A item window class for map.
  //  This window used Popup window plugin by Triacontane as reference.Thanks !
  //=============================================================================
  function Window_AllIsMine() {
    this.initialize.apply(this, arguments);
    NTMO.Queue.initialize();
  }

  Window_AllIsMine.prototype = Object.create(Window_Base.prototype);
  Window_AllIsMine.prototype.constructor = Window_AllIsMine;

  Window_AllIsMine.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.apply(this, arguments);

    this.pause = true;
    this._count_queue = 0;
    this._baloon_text = null;
    this.BORDER_Y = 100;
  };

  Window_AllIsMine.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    this.shouldShowWindow();
    this.updatePauseSign();
    this.moveToPlayer();
    this.updateBaloonWindow();

    //This count is for displaying the baloon window.
    this._count_queue++;
  };

  Window_AllIsMine.prototype.reset = function (text) {
    this.contents.clear();
    text = this.cutEscapeString(text);
    var width = this.contents.measureTextWidth(text) + param.windowMargin;
    var height = 100;
    this.width = width;
    this.height = height;
  };

  Window_AllIsMine.prototype.moveToPlayer = function () {
    var pos_x;
    var pos_y;
    pos_x = $gamePlayer.screenX() + param.offsetX - this._width / 2;

    if (this.isPlayerUpper()) {
      pos_y = $gamePlayer.screenY() + param.offsetY;
    } else {
      pos_y = $gamePlayer.screenY() + param.offsetY - this._height * 1.5;
    }

    this.x = pos_x;
    this.y = pos_y;
  };

  Window_AllIsMine.prototype.updatePauseSign = function () {
    if (this.isPlayerUpper()) {
      this._windowPauseSignSprite.move(this._width / 2, -12);
      this._windowPauseSignSprite.rotation = (180 * Math.PI) / 180;
    } else {
      this._windowPauseSignSprite.move(this._width / 2, this._height + 12);
      this._windowPauseSignSprite.rotation = 0;
    }
  };

  Window_AllIsMine.prototype.updateBaloonWindow = function () {
    if (this.canNextQueue()) {
      //Get a next text.
      this._baloon_text = NTMO.Queue.dequeue();
      var nextSe = NTMO.Queue.dequeueType();

      if (this._baloon_text === null) {
        return;
      }

      this.reset(this._baloon_text);
      this.drawTextEx(this._baloon_text, 10, 10);
      console.log(this._baloon_text);
      this.playSe(nextSe);
    }
  };

  Window_AllIsMine.prototype.canNextQueue = function () {
    if (this._count_queue > param.waitTime) {
      this._count_queue = 0;
      return true;
    }
    return false;
  };

  Window_AllIsMine.prototype.shouldShowWindow = function () {
    if (this._baloon_text === null && this.visible) {
      this.hide();
    } else if (this._baloon_text !== null && !this.visible) {
      this.show();
    }
  };

  Window_AllIsMine.prototype.loadWindowskin = function () {
    this.windowskin = ImageManager.loadSystem(param.imgWindowName);
  };

  Window_AllIsMine.prototype.cutEscapeString = function (str) {
    str = str.replace(/\[.*?\]/g, "");
    str = str.replace(/\C/g, "");
    return str;
  };

  Window_AllIsMine.prototype.isPlayerUpper = function () {
    if ($gamePlayer.screenY() < this.BORDER_Y) {
      return true;
    }

    return false;
  };

  Window_AllIsMine.prototype.playSe = function (type) {
    switch (type) {
      case NTMO.SE_TYPE.Gold:
        if (param.goldSeName) {
          var audio = {
            name: param.goldSeName,
            volume: param.goldSeVolume,
            pitch: param.goldSePitch,
          };
          AudioManager.playSe(audio);
        }
        break;
      case NTMO.SE_TYPE.Weapon:
        if (param.weaponSeName) {
          var audio = {
            name: param.weaponSeName,
            volume: param.weaponSeVolume,
            pitch: param.weaponSePitch,
          };
          AudioManager.playSe(audio);
        }
        break;
      case NTMO.SE_TYPE.Armor:
        if (param.armorSeName) {
          var audio = {
            name: param.armorSeName,
            volume: param.armorSeVolume,
            pitch: param.armorSePitch,
          };
          AudioManager.playSe(audio);
        }
        break;
      case NTMO.SE_TYPE.Item:
        if (param.itemSeName) {
          var audio = {
            name: param.itemSeName,
            volume: param.itemSeVolume,
            pitch: param.itemSePitch,
          };
          AudioManager.playSe(audio);
        }
        break;
    }
  };

  //=============================================================================
  // Game_Interpreter
  //  Override Game_Interpreter for displaying a getting item.
  //=============================================================================

  // Change Gold
  Game_Interpreter.prototype.command125 = function () {
    var value = this.operateValue(
      this._params[0],
      this._params[1],
      this._params[2]
    );
    $gameParty.gainGold(value);

    //If player lost gold, dosen't display anything.
    if (value > 0 && SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene._window_allMine._count_queue = param.waitTime;
      NTMO.Queue.enqueue(
        "\\I[" +
          param.goldIconNum +
          "]\\C[" +
          param.itemNameColor +
          "]" +
          String(value) +
          "G\\C[0] " +
          param.pickUpGold,
        NTMO.SE_TYPE.Gold
      );
    }
    return true;
  };

  // Change Items
  Game_Interpreter.prototype.command126 = function () {
    var value = this.operateValue(
      this._params[1],
      this._params[2],
      this._params[3]
    );
    $gameParty.gainItem($dataItems[this._params[0]], value);

    if (value > 0 && SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene._window_allMine._count_queue = param.waitTime;
      if (param.englishMode === "true") {
        if (value === 1) {
          NTMO.Queue.enqueue(
            "\\I[" +
              $dataItems[this._params[0]].iconIndex +
              "]" +
              param.gettingItemStr +
              " a\\C[" +
              param.itemNameColor +
              "] " +
              $dataItems[this._params[0]].name +
              "\\C[0] !",
            NTMO.SE_TYPE.Item
          );
        } else {
          NTMO.Queue.enqueue(
            "\\I[" +
              $dataItems[this._params[0]].iconIndex +
              "]" +
              param.gettingItemStr +
              " " +
              String(value) +
              " \\C[" +
              param.itemNameColor +
              "] " +
              $dataItems[this._params[0]].name +
              "s \\C[0]!",
            NTMO.SE_TYPE.Item
          );
        }
      } else {
        NTMO.Queue.enqueue(
          "\\I[" +
            $dataItems[this._params[0]].iconIndex +
            "]\\C[" +
            param.itemNameColor +
            "]" +
            $dataItems[this._params[0]].name +
            "\\C[0]を\\C[" +
            param.itemNameColor +
            "]" +
            String(value) +
            "\\C[0]" +
            param.gettingItemStr,
          NTMO.SE_TYPE.Item
        );
      }
    }
    return true;
  };

  // Change Weapons
  Game_Interpreter.prototype.command127 = function () {
    var value = this.operateValue(
      this._params[1],
      this._params[2],
      this._params[3]
    );
    $gameParty.gainItem($dataWeapons[this._params[0]], value, this._params[4]);

    if (value > 0 && SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene._window_allMine._count_queue = param.waitTime;
      if (param.englishMode === "true") {
        if (value === 1) {
          NTMO.Queue.enqueue(
            "\\I[" +
              $dataWeapons[this._params[0]].iconIndex +
              "]" +
              param.gettingItemStr +
              " a\\C[" +
              param.itemNameColor +
              "] " +
              $dataWeapons[this._params[0]].name +
              "\\C[0] !",
            NTMO.SE_TYPE.Weapon
          );
        } else {
          NTMO.Queue.enqueue(
            "\\I[" +
              $dataWeapons[this._params[0]].iconIndex +
              "]" +
              param.gettingItemStr +
              " " +
              String(value) +
              " \\C[" +
              param.itemNameColor +
              "] " +
              $dataWeapons[this._params[0]].name +
              "s \\C[0]!",
            NTMO.SE_TYPE.Weapon
          );
        }
      } else {
        NTMO.Queue.enqueue(
          "\\I[" +
            $dataWeapons[this._params[0]].iconIndex +
            "]\\C[" +
            param.itemNameColor +
            "]" +
            $dataWeapons[this._params[0]].name +
            "\\C[0]を\\C[" +
            param.itemNameColor +
            "]" +
            String(value) +
            "\\C[0]" +
            param.gettingItemStr,
          NTMO.SE_TYPE.Weapon
        );
      }
    }
    return true;
  };

  // Change Armors
  Game_Interpreter.prototype.command128 = function () {
    var value = this.operateValue(
      this._params[1],
      this._params[2],
      this._params[3]
    );
    $gameParty.gainItem($dataArmors[this._params[0]], value, this._params[4]);

    if (value > 0 && SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene._window_allMine._count_queue = param.waitTime;
      if (param.englishMode === "true") {
        if (value === 1) {
          NTMO.Queue.enqueue(
            "\\I[" +
              $dataArmors[this._params[0]].iconIndex +
              "]" +
              param.gettingItemStr +
              " a\\C[" +
              param.itemNameColor +
              "] " +
              $dataArmors[this._params[0]].name +
              "\\C[0] !",
            NTMO.SE_TYPE.Armor
          );
        } else {
          NTMO.Queue.enqueue(
            "\\I[" +
              $dataArmors[this._params[0]].iconIndex +
              "]" +
              param.gettingItemStr +
              " " +
              String(value) +
              " \\C[" +
              param.itemNameColor +
              "] " +
              $dataItems[this._params[0]].name +
              "s \\C[0]!",
            NTMO.SE_TYPE.Armor
          );
        }
      } else {
        NTMO.Queue.enqueue(
          "\\I[" +
            $dataArmors[this._params[0]].iconIndex +
            "]\\C[" +
            param.itemNameColor +
            "]" +
            $dataArmors[this._params[0]].name +
            "\\C[0]を\\C[" +
            param.itemNameColor +
            "]" +
            String(value) +
            "\\C[0]" +
            param.gettingItemStr,
          NTMO.SE_TYPE.Armor
        );
      }
    }
    return true;
  };
})();
