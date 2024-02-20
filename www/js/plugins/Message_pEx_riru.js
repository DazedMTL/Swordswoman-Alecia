//=============================================================================
// Message_pEx_riru.js
//=============================================================================
/*:
 * @plugindesc 制御文字でピクチャ操作ができるようになります。
 * @author riru
 *
 * @help
 *＜使い方＞
 *以下の制御文字を記入することでそれぞれのピクチャ操作ができます
 *（記入前に指定したピクチャ番号が表示されていないとエラーがおきます）
 *
 *\PICN[ピクチャ番号,"新しいピクチャ名"]　…　ピクチャ名を変更　例）\PICN[1,"新しい立ち絵"]
 *\PICO[ピクチャ番号,新しい透明度]　…　透明度を変更　例）\PICO[1,200]
 *\PICOR[ピクチャ番号,新しい原点]　…　原点を変更（0で左上、1で中央）　例）\PICOR[1,1]
 *\PICX[ピクチャ番号,新しいX座標]　…　X座標を変更　例）\PICX[1,100]
 *\PICY[ピクチャ番号,新しいY座標]　…　Y座標を変更　例）\PICY[1,100]
 *\PICSX[ピクチャ番号,新しいX拡大率]　…　X拡大率を変更　例）\PICSX[1,150]
 *\PICSY[ピクチャ番号,新しいY拡大率]　…　Y拡大率を変更　例）\PICSY[1,150]
 *\PICB[ピクチャ番号,新しい合成方法]　…　合成方法を変更（0：通常、1:加算、2:乗算、3:スクリーン）　例）\PICB[1,1]
 *\PICT[ピクチャ番号,R,G,B,グレー]　…　ピクチャの色調変更　例）\PICT[1,150,50,-68,30]
 *\PICR[ピクチャ番号,角度]　…　ピクチャの回転　例）\PICR[1,150]
 *\PICE[ピクチャ番号]　…　ピクチャの消去　例）\PICE[1]
 *
 * ＜規約＞
 * 有償無償問わず使用できます。改変もご自由にどうぞ。使用報告もいりません。２次配布は作成者を偽らなければOKです。
 *著作権は放棄していません。使用する場合は以下の作者とURLをreadmeなどどこかに記載してください
 *
 * ＜作者情報＞
 *作者：riru
 *HP：ガラス細工の夢幻
 *URL：http://garasuzaikunomugen.web.fc2.com/index.html
 */

(function () {
  riru_pexWindow_Base_processEscapeCharacter =
    Window_Base.prototype.processEscapeCharacter;
  Window_Base.prototype.processEscapeCharacter = function (code, textState) {
    switch (code) {
      case "PICN":
        var pic_info = this.obtainEscapeParampex(textState).split(",");
        var pic_number = Number(pic_info[0]);
        if (pic_info[1] != null) {
          var pic_name = pic_info[1];
          $gameScreen._pictures[pic_number]._name = pic_name;
        }
        break;
      case "PICO":
        var pic_info = this.obtainEscapeParampex(textState).split(",");
        var pic_number = Number(pic_info[0]);
        if (pic_info[1] != null) {
          var pic_opa = Number(pic_info[1]);
          $gameScreen._pictures[pic_number]._opacity = pic_opa;
        }
        break;
      case "PICOR":
        var pic_info = this.obtainEscapeParampex(textState).split(",");
        var pic_number = Number(pic_info[0]);
        if (pic_info[1] != null) {
          var pic_ori = Number(pic_info[1]);
          $gameScreen._pictures[pic_number]._origin = pic_ori;
        }
        break;
      case "PICX":
        var pic_info = this.obtainEscapeParampex(textState).split(",");
        var pic_number = Number(pic_info[0]);
        if (pic_info[1] != null) {
          var pic_x = Number(pic_info[1]);
          $gameScreen._pictures[pic_number]._x = pic_x;
        }
        break;
      case "PICY":
        var pic_info = this.obtainEscapeParampex(textState).split(",");
        var pic_number = Number(pic_info[0]);
        if (pic_info[1] != null) {
          var pic_y = Number(pic_info[1]);
          $gameScreen._pictures[pic_number]._y = pic_y;
        }
        break;
      case "PICSX":
        var pic_info = this.obtainEscapeParampex(textState).split(",");
        var pic_number = Number(pic_info[0]);
        if (pic_info[1] != null) {
          var pic_sx = Number(pic_info[1]);
          $gameScreen._pictures[pic_number]._scaleX = pic_sx;
        }
        break;
      case "PICSY":
        var pic_info = this.obtainEscapeParampex(textState).split(",");
        var pic_number = Number(pic_info[0]);
        if (pic_info[1] != null) {
          var pic_sy = Number(pic_info[1]);
          $gameScreen._pictures[pic_number]._scaleY = pic_sy;
        }
        break;
      case "PICB":
        var pic_info = this.obtainEscapeParampex(textState).split(",");
        var pic_number = Number(pic_info[0]);
        if (pic_info[1] != null) {
          var pic_bl = Number(pic_info[1]);
          $gameScreen._pictures[pic_number]._blendMode = pic_bl;
        }
        break;
      case "PICT":
        var pic_info = this.obtainEscapeParampex(textState).split(",");
        var pic_number = Number(pic_info[0]);
        $gameScreen.tintPicture(
          pic_number,
          [pic_info[1], pic_info[2], pic_info[3], pic_info[4]],
          1
        );
        break;
      case "PICE":
        $gameScreen.erasePicture(this.obtainEscapeParam(textState));
        break;
      case "PICR":
        var pic_info = this.obtainEscapeParampex(textState).split(",");
        var pic_number = Number(pic_info[0]);
        if (pic_info[1] != null) {
          $gameScreen.rotatePicture(pic_number, pic_info[1]);
        }
        break;
      default:
        riru_pexWindow_Base_processEscapeCharacter.call(this, code, textState);
        break;
    }
  };
  Window_Base.prototype.obtainEscapeParampex = function (textState) {
    var arr = /^\[(.*?)\]/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return "";
    }
  };
})();
