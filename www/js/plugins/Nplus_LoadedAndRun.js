// ------------------------------------------------------
// Copyright (c) 2018 n++
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------

/*:
 * @plugindesc セーブデータロード後実行
 * @author n++
 *
 * @param オンにするスイッチIDを指定
 * @desc オンにするスイッチIDを , 区切りで指定します（半角数字）
 * @default false
 *
 * @param オフにするスイッチIDを指定
 * @desc オフにするスイッチIDを , 区切りで指定します（半角数字）
 * @default false
 *
 * @param コモンイベントIDを指定
 * @desc コモンイベントIDを指定します（半角数字）
 * @default false
 *
 * @help ------------------------------------------------------
 * 使い方
 * ------------------------------------------------------
 * セーブデータロード後に任意のスイッチのオンオフと、
 * コモンイベントを実行出来るプラグインです。
 *
 * - スイッチをオンにする -
 * パラメータの "オンにするスイッチIDを指定" の値に
 * カンマ(,)区切りで入力します。
 * カンマ区切りで入力された、全てのスイッチがオンになります。
 * また、半角数字と","以外の文字列は無視されます。
 *
 * - スイッチをオフにする -
 * パラメータの "オフにするスイッチIDを指定" の値に
 * カンマ(,)区切りで入力します。
 * カンマ区切りで入力された、全てのスイッチがオフになります。
 * また、半角数字と","以外の文字列は無視されます。
 *
 * - コモンイベントを実行する -
 * パラメータの "コモンイベントIDを指定" の値に
 * コモンイベントIDを指定します。
 * 半角数字以外の文字列は無視されます。
 *
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 本プラグインはMITライセンスで公開します。
 * 商用利用・アダルト問わず利用可能です。
 * 本プラグインにより生じた如何なる問題についても一切の責任を負いかねます。
 *
 * Twitter : https://twitter.com/_nplusplus
 */

(function (_global) {
  var _DataManager_loadGameWithoutRescue = DataManager.loadGameWithoutRescue;
  DataManager.loadGameWithoutRescue = function (savefileId) {
    var ret = _DataManager_loadGameWithoutRescue.call(this, savefileId);

    if (ret) {
      // パラメータ取得
      var PluginName = "Nplus_LoadedAndRun";
      var params = PluginManager.parameters(PluginName);

      // - コモンイベント実行 -
      var commonEventStr = params["コモンイベントIDを指定"];
      commonEventStr = commonEventStr.replace(/[^0-9]/g, "");

      var commonEventId = Number(params["コモンイベントIDを指定"]) || null;
      if (commonEventId != null) {
        $gameTemp.reserveCommonEvent(commonEventId);
      }

      // - スイッチをオンにする -
      var onSwitchStr = params["オンにするスイッチIDを指定"] + "";
      onSwitchStr = onSwitchStr.replace(/,{2,}/g, ",");
      onSwitchStr = onSwitchStr.replace(/[^0-9,]|(^,)|(,$)/g, "");

      var onSwitchArr = onSwitchStr.split(",");

      onSwitchArr.forEach(function (onSwitchId) {
        if (onSwitchId != "") {
          $gameSwitches.setValue(Number(onSwitchId), true);
        }
      });

      // - スイッチをオフにする -
      var offSwitchStr = params["オフにするスイッチIDを指定"] + "";
      offSwitchStr = offSwitchStr.replace(/,{2,}/g, ",");
      offSwitchStr = offSwitchStr.replace(/[^0-9,]|(^,)|(,$)/g, "");

      var offSwitchArr = offSwitchStr.split(",");

      offSwitchArr.forEach(function (offSwitchId) {
        if (offSwitchId != "") {
          $gameSwitches.setValue(Number(offSwitchId), false);
        }
      });
    }

    return ret;
  };
})(this);
