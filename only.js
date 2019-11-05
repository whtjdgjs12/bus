var request=require("request")
var cheerio=require("cheerio")

var defaultUrl="http://openapi.gbis.go.kr/ws/rest/busarrivalservice/station"  //정류소 조회 REST Api url
const SERVICE_KEY="Bv%2BK%2B1uM4LD2KOy%2FPsps6bprRS2LtXqg0BsySnVxMAEYiQPHD1mLEt3Za5OFVvfd2S3C48FOUMmQPpRLknDm%2BA%3D%3D"   //!!!꼭 서비스키 자기꺼로 수정해서 쓰셔야합니다.
var keyword="202000030"  //query로 던져지는 인자, getStationId에서 얻은 정류소 id를 넣어주면 됨.

//버스 도착 정보에서 routeId까지만 나오는 작업
request(defaultUrl+"?serviceKey="+SERVICE_KEY+"&stationId="+keyword, function(err, res, body){
    var $=cheerio.load(body)

    // 각각 버스 도착 정보는 busArrivalList 태그 안에 들어있음
    // 따라서 each문 이용
    $("busArrivalList").each(function(index, bus){
        console.log("=====================")

        // bus 변수를 context로 주어서 선택자 이용
        console.log("routeId : "+$('routeId', bus).text())
        console.log($('predictTime1', bus).text()+" mins left  "+$('predictTime2', bus).text()+" mins left")
        console.log("=====================")
    })
})
