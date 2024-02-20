//=============================================================================
// VariableDigitsHandler.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 たくろう_りらっくすーぷ
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Last Updated: 2020/07/29
//
// Version
// 1.0.0  2020/07/29 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://tkrou.hatenablog.jp/
// [Twitter]: https://twitter.com/t_taraku3
//=============================================================================

/*:ja
 * @plugindesc 変数の任意の桁を参照したり処理したりします　e.g. [VDH_CTD 参照 対象変数 桁数 代入先変数]
 * @author たくろう_りらっくすーぷ
 *
 *
 * @help 指定した変数の指定した桁に対して、参照したり計算したりするプラグインです。
 *
 * ◆プラグインパラメーター
 * 　今のところありません。
 *
 * ◆プラグインコマンド
 *  イベントコマンド「プラグインコマンド」から実行してください。
 *  （引数の間は半角スペースで区切ってください）
 *
 * ▽コマンドの書式
 * 　VDH_CTD 操作 対象変数 桁数 [計算値] [代入先変数]
 * 　※VDH_　Command　Target　Digit　の意
 *
 * ▽ざっくり実行例
 * 　<参照（REF)>
 * 　変数1の3桁目を参照し、変数10に代入
 * 　VDH_CTD 参照 1 3 10
 *
 * 　変数1の左から2桁目を参照し、変数10に代入
 * 　VDH_CTD REF 1 -2 10
 *
 * 　<計算（CAL)>
 * 　変数1の3桁目に5を加算し、変数10に代入
 * 　VDH_CTD 計算 1 3 5 10
 *
 * 　変数1の左から4桁目に -2を計算（減算）し、変数1を上書き更新
 * 　VDH_CTD CAL 1 -4 -2
 *
 * 　変数1(文字列)の3桁目に 特別な を結合し、変数10に代入
 * 　VDH_CTD 計算 1 3 特別な 10
 *
 *
 * ▽操作についての詳細
 * 　VDH_CTD 操作 対象変数 桁数 [計算値] [代入先変数]
 *
 * 　第一引数で操作を指定します。
 * 　（括弧内で書かれた文字でも指定できます）
 *
 * ●参照（REF)
 * 　　指定した変数の、任意の桁の数を参照します。
 *
 * 　(例) _変数1_ の _3桁目_ を参照し、結果を _変数10_ に代入する
 * 　VDH_CTD 参照 1 3 10
 * 　→変数1が 3857461 なら 変数10 に 4 が代入される
 *
 *
 * 　　第三引数の桁数に負の数を指定すると、左から桁数カウントします。
 *
 * 　(例) _変数1_ の _左から2桁目_ を参照し、結果を _変数10_ に代入する
 * 　VDH_CTD REF 1 -2 10
 * 　→変数1が 3857461 なら 変数10 に 8 が代入される
 *
 *
 * 　指定した変数の中身が文字列だった場合、対象位置の文字が代入先変数に入ります。
 *
 * 　(例) _変数1_ の _3桁目_ を参照し、結果を _変数10_ に代入する
 * 　VDH_CTD 参照 1 3 10
 * 　→変数1が 「これは文字列です」 なら 変数10 に 「列」 が代入される
 *
 * 　VDH_CTD REF 1 -2 10
 * 　→変数1が 「これは文字列です」 なら 変数10 に 「れ」 が代入される
 *
 * 　*===**===**===*
 * ●計算（CAL)
 * 　　指定した変数の、任意の桁を、計算値で計算します。
 *
 * 　(例) _変数1_ の _3桁目_ に、_計算値 5_を加算し、結果を _変数10_ に代入する
 * 　VDH_CTD 計算 1 3 5 10
 * 　→変数1が 3857461 なら 変数10 に 3857961 が代入される
 *
 * 　　計算値に負の数を入れると減算します。
 * 　VDH_CTD CAL 1 3 -2 10
 * 　→変数1が 3857461 なら 変数10 に 3857261 が代入される
 *
 * 　　桁の繰り上がり繰り下がりはなく、0に戻ります。ダイヤルのイメージです。
 * 　VDH_CTD 計算 1 3 8 10
 * 　→変数1が 3857461 なら 変数10 に 3857261 が代入される
 * 　VDH_CTD 計算 1 3 -5 10
 * 　→変数1が 3857461 なら 変数10 に 3857961 が代入される
 *
 *
 * 　　第三引数の桁数に負の数を指定すると、左から桁数カウントします。
 *
 * 　(例) _変数1_ の _左から2桁目_ に、_計算値 5_を加算し、結果を _変数10_ に代入する
 * 　VDH_CTD 計算 1 -2 5 10
 * 　→変数1が 3857461 なら 変数10 に 3357461 が代入される
 *
 *
 * 　　第五引数の代入先変数を指定しないと、第二引数の対象変数を上書きする形で計算します。
 *
 * 　(例) _変数1_ の _3桁目_ に、_計算値 5_を加算する
 * 　VDH_CTD 計算 1 3 5
 * 　→変数1が 3857461 なら 変数1 が 3857961 になる
 *
 * 　(例) _変数1_ の _左から4桁目_ に、_計算値 -5_を計算する（減算）
 * 　VDH_CTD 計算 1 -4 -5
 * 　→変数1が 3857461 なら 変数1 が 3852961 になる
 *
 *
 * 　指定した変数の中身が文字列だった場合、対象位置に文字列が結合されます。
 *
 * 　(例) _変数1_ の _3桁目_ に _「のテスト」_を結合し、結果を _変数10_ に代入する
 * 　VDH_CTD 計算 1 3 のテスト 10
 * 　→変数1が 「これは文字列です」 なら 変数10 に 「これは文字列のテストです」 が代入される
 *
 * 　左からの桁数カウントと変数上書きも同様
 * 　VDH_CTD CAL 1 -3 特別な
 * 　→変数1が 「これは文字列です」 なら 変数1 が 「これは特別な文字列です」 になる
 *
 *
 *
 *
 */

(function () {
  // strictモードで動作（よくわかってない）
  "use strict";

  // コマンド名を取得する関数を定義
  var getCommandName = function (command) {
    // 大文字に変換して戻す
    return (command || "").toUpperCase();
  };

  //=============================================================================
  // Game_Interpreter
  //  プラグインコマンドを追加定義します。
  //=============================================================================

  // 元の処理を変数に入れて
  var _Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  // 元の処理を上書きする
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    // 変数にいれた元の処理を呼び出して
    _Game_Interpreter_pluginCommand.apply(this, arguments);
    // 今回追加する関数を追加する
    this.pluginCommandVariableDigitsHandler(command, args);
  };

  // 追加定義するプラグインコマンド
  Game_Interpreter.prototype.pluginCommandVariableDigitsHandler = function (
    command,
    args
  ) {
    // プラグインコマンドで入力された文字列によって今回の処理が呼び出されるようにする
    switch (getCommandName(command)) {
      // プラグインコマンドのメインコマンド部分
      case "変数操作-対象-桁":
      // 覚え方は　VDH_　Command　Target　Digit
      case "VDH_CTD":
        // 上のコマンド名が指定されたら、下記関数を呼び出す
        VariableDigitsHandler(args);
        break;

      // 別の処理が追加したくなったらここにこんな感じで追加する
      // case '変数操作-対象-桁-代入先':
      // case 'VDH_CTD':
      //     // 上のコマンド名が指定されたら、下記関数を呼び出す
      //     VariableDigitsHandler(args)
      //     break;
    }
  };

  //=============================================================================
  // VariableDigitsHandler
  //  追加するプラグインコマンド処理の関数を定義します。
  //=============================================================================

  // プラグインコマンドで呼び出された関数
  function VariableDigitsHandler(args) {
    // 操作対象の変数の中身を target に代入する
    var target = $gameVariables.value(args[1]);
    // 操作内容によって分岐
    switch (getCommandName(args[0])) {
      // ==== 任意の桁の参照 ======
      // args[0]操作内容　args[1]操作対象の変数　args[2]指定桁数　args[3]代入先の変数
      case "REF":
      case "参照":
        // 変数の中身が数字だった場合と文字列だった場合で処理を分岐
        if (typeof target == "number") {
          // もし指定桁数が正の数だったら右から桁数カウント
          if (+args[2] > 0) {
            // 対象桁の値を取得
            var digitvalue = +String(target)[String(target).length - args[2]];
            // 取得した値を代入先の変数に代入
            $gameVariables.setValue(args[3], digitvalue);
          } else {
            // もし桁数が正の数じゃなかったら（負の数）だったら左から桁数カウント
            var digitvalue = +String(target)[Math.abs(args[2]) - 1];
            $gameVariables.setValue(args[3], digitvalue);
          }
        } else if (typeof target == "string") {
          // 文字列を扱うパターンがパッと思いつかないが、とりあえずいれておく
          if (+args[2] > 0) {
            var digitvalue = target[target.length - args[2]];
            $gameVariables.setValue(args[3], digitvalue);
          } else {
            var digitvalue = target[Math.abs(args[2]) - 1];
            $gameVariables.setValue(args[3], digitvalue);
          }
        }
        break;

      // ==== 任意の桁の計算 ======
      // args[0]操作内容　args[1]操作対象の変数　args[2]指定桁数　args[3]計算値　args[4]代入先の変数
      case "CAL":
      case "計算":
        // 変数の中身が数字だった場合と文字列だった場合で処理を分岐
        if (typeof target == "number") {
          // targegの数字列を配列にする
          const target_array = [...String(target)];

          // もし桁数が正の数だったら右から桁数カウント
          if (+args[2] > 0) {
            // 対象桁数の値を取得
            var digitvalue = +target_array[target_array.length - args[2]];
            // もし計算値が負の数で計算結果が負の数になる場合は9に戻す(絶対値で加算)
            if (+args[3] < 0 && Math.abs(args[3]) > digitvalue) {
              var cal_result = digitvalue + Math.abs(args[3]);
            } else {
              // 取得した値に計算値を加算
              var cal_result = digitvalue + +args[3];
            }
            // 計算した結果を同じ桁のところに入れる　2桁以上になる場合は1の位のみを使用
            target_array[target_array.length - args[2]] = cal_result % 10;
          } else {
            // 指定桁数が負の数で左からカウント
            var digitvalue = +target_array[Math.abs(args[2]) - 1];
            var cal_result = digitvalue + +args[3];
            target_array[Math.abs(args[2]) - 1] = cal_result % 10;
          }
          // 配列を数値に変換
          target = +target_array.join("");
        } else if (typeof target == "string") {
          // 文字列を扱うパターンがパッと思いつかないが、とりあえずいれておく

          // targegの文字列を配列にする
          const target_array = [...target];

          // もし桁数が正の数だったら右から桁数カウント
          if (+args[2] > 0) {
            // 対象桁数の文字を取得
            var digitvalue = target_array[target_array.length - args[2]];
            // 取得した文字に文字を結合
            var cal_result = digitvalue + String(args[3]);
            // 結合した結果を同じ桁のところに入れる
            target_array[target_array.length - args[2]] = cal_result;
          } else {
            // 指定桁数が負の数で左からカウント
            var digitvalue = target_array[Math.abs(args[2]) - 1];
            var cal_result = digitvalue + String(args[3]);
            target_array[Math.abs(args[2]) - 1] = cal_result;
          }
          // 配列を文字列に変換
          target = target_array.join("");
        }

        // 代入先が指定されているかどうか
        if (typeof args[4] === "undefined") {
          // 代入先変数が指定されてない場合、元の変数を上書きする
          $gameVariables.setValue(args[1], target);
        } else {
          // 指定されていればそこに代入
          $gameVariables.setValue(args[4], target);
        }

        break;
    }
  }
})();
