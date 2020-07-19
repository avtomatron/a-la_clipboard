function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);

}
 
function isValidHttpUrl(str) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  var pattern = new RegExp(regex); 
  return pattern.test(str);
}



function delrow(rowno){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0]
  sheet.deleteRow(rowno+1);
  return loaddata();
}

function loaddata(){
  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0]
  var lastrow = sheet.getLastRow();
  if (lastrow==0){return "Пока пусто"}
  else{
    var loaded=sheet.getRange("A1:A"+lastrow).getValues();
    var loaded_html="";
    for (var item in loaded){
      
      if(isValidHttpUrl(loaded[item])){
        loaded_html+='<tr><td><input type="button" value="X" name="B3" onclick="delrow('+item+')"></td></td><td><a target="_blank" href="'+loaded[item]+'">'+loaded[item]+'</a></td></tr>';
      }
      else{
        
        loaded_html+='<tr><td><input type="button" value="X" name="B3" onclick="delrow('+item+')"></td></td><td>'+loaded[item]+"</td></tr>";
      }
    }
    return loaded_html;
  }
}
function processForm(formObject) {
 
  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0]
 
  var lastrow = sheet.getLastRow()+1;
 
  var fieldslength=Object.keys(formObject).length;
 
 var result = Object.keys(formObject).map(function(key) {
   return [key, formObject[key]];
 });
  result.sort();
 
 
 for (i = 0; i < fieldslength; i++) {

    sheet.getRange(lastrow, i+1).setValue(result[i][1]);
 } 
 
  return loaddata();
  
}
 
