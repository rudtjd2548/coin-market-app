export function addComma(obj) {
  var regx = new RegExp(/(-?\d+)(\d{3})/);
  var bExists = obj.toString().indexOf(".", 0);//0번째부터 .을 찾는다.
  var strArr = obj.toString().split('.');
  while (regx.test(strArr[0])) {//문자열에 정규식 특수문자가 포함되어 있는지 체크
    //정수 부분에만 콤마 달기 
    strArr[0] = strArr[0].replace(regx, "$1,$2");//콤마추가하기
  }
  if (bExists > -1) {
    //. 소수점 문자열이 발견되지 않을 경우 -1 반환
    obj = strArr[0] + "." + strArr[1];
  } else { //정수만 있을경우 //소수점 문자열 존재하면 양수 반환 
    obj = strArr[0];
  }
  return obj;//문자열 반환
}

export function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return { year, month, day }
}

var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export function abbreviateNumber(number) {
  var tier = Math.log10(Math.abs(number)) / 3 | 0;
  if (tier === 0) return number;
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  return scaled.toFixed(1) + suffix;
}