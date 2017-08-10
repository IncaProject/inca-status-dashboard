
var gatewayURL = "http://inca.nics.utk.edu/inca/JSON/kit-status-v1/sp-software-services/";
var superCompNames = ['lsu-supermic', 'osg', 'psc-bridges',
                          'sdsc-comet', 'stanford-xstream', 'tacc-maverick', 'tacc-stampede', 'tacc-stampede2', 'tacc-wrangler'];
var superComps = new Array();
var hover = "";
        
    //Define Supercomputer Object
    var SuperComputer = function(name, tests, results){
           this.name = name;
           this.tests = tests;
           this.results = results;
    }
        
    //Creates test object and adds to the array of tests for each supercomputer
    for(var i = 0; i < superCompNames.length; i++){
        $.ajax({
           url: 'http://inca.xsede.org/inca/JSON/kit-status-v1/sp-software-services/' + superCompNames[i] + '/',
           dataType: 'json',
           type: 'get',
           cache: false,
           async: false,
           success: function(data){
               var currentTests = new Array(data["quer:object"].reportSummary.length);
               var currentResults = new Array(data["quer:object"].reportSummary.length);
               var currentErrors = new Array(data["quer:object"].reportSummary.length);
               for(var j = 0; j < data["quer:object"].reportSummary.length; j++){
                   var nickname = data["quer:object"].reportSummary[j].nickname.content;
                   var result = "";
                   try{
                       result = data["quer:object"].reportSummary[j].comparisonResult.content;
                       if(result.includes("Failure:errorMessage")){
                           result = "Error: " + data["quer:object"].reportSummary[j].errorMessage.content;
                           
                        }
                   }catch(err){
                       result = "No Results Found";
                   }
                   currentTests[j] = nickname;
                   currentResults[j] = result;   
                 
               }
               superComps[i] = new SuperComputer(superCompNames[i], currentTests, currentResults);
           }
        });
        }


    function createChart(tests, results){
       var chart = new Array();
        for(var i = 0; i < tests.length; i++){
            var color;
            if(results[i] == "Success"){
                color = "#45a2d1";
               
            }else if(results[i] == "No Results Found"){
                color = "#808080";
            }else{
                color = "#FF6347";
            }
           var temp = {x:"", y:tests[i], heat:results[i], fill:color};
           chart[i] = temp;
        }
        return chart;
    }

var Stanford = createChart(superComps[4].tests, superComps[4].results);
var SDSC = createChart(superComps[3].tests, superComps[3].results);
var LSU = createChart(superComps[0].tests, superComps[0].results);
var OSU = createChart(superComps[1].tests, superComps[1].results);
var Pitt = createChart(superComps[2].tests, superComps[2].results);
var TaccStamp1 = createChart(superComps[6].tests, superComps[6].results);
var TaccMav = createChart(superComps[5].tests, superComps[5].results);
var TaccStamp2 = createChart(superComps[7].tests, superComps[7].results);
var TaccWrang = createChart(superComps[8].tests, superComps[8].results);


var begin = [[  "Please click on", ""], ["any test to", ""],["view more details", ""],["",""],["Use the scrollbars",""],["to see results",""]]

report = {"quer:object":{"reportDetails":{"xmlns":"http://inca.sdsc.edu/dataModel/reportDetails_2.1","suiteId":{"xmlns":"","content":7},"comparisonResult":{"xmlns":"","content":"Success"},"instanceId":{"xmlns":"","content":2063863},"reportId":{"xmlns":"","content":2006430},"report":{"args":{"arg":[{"name":"gateway","value":"no"},{"name":"shell","value":"/bin/sh"},{"name":"submitparam","value":""},{"name":"walllimit","value":10},{"name":"log","value":5},{"name":"poll","value":60},{"name":"scheduler","value":"slurm"},{"name":"verbose","value":1},{"name":"help","value":"no"},{"name":"type","value":""},{"name":"randomwait","value":0},{"name":"var","value":""},{"name":"queue","value":""},{"name":"showscript","value":"no"},{"name":"version","value":"no"},{"name":"exec","value":""},{"name":"timeout","value":".000001"},{"name":"account","value":"TG-IRI160006"},{"name":"nodes","value":"1::1"}]},"xmlns":"","hostname":"comet-ln2.sdsc.edu","reporterPath":"/home/inca/inca-client-comet/var/reporter-packages/bin/cluster.batch.wrapper","log":{"system":[{"message":"sbatch /home/inca/inca-client-comet/sub2836.sub","gmt":"2017-08-03T19:13:00Z"},{"message":"`scancel 10552251`","gmt":"2017-08-03T19:14:13Z"}],"xmlns:rep":"http://inca.sdsc.edu/dataModel/report_2.1"},"workingDir":"/home/inca/inca-client-comet","name":"cluster.batch.wrapper","body":{"performance":{"xmlns:rep":"http://inca.sdsc.edu/dataModel/report_2.1","ID":"queuetime","benchmark":{"ID":"queuetime","parameters":{"parameter":[{"ID":"nodes","value":1},{"ID":"type","value":""}]},"statistics":{"statistic":{"ID":"elapsed","units":"seconds","value":"TBD"}}}}},"version":18,"exitStatus":{"errorMessage":"BATCH: Reporter submission timed out","completed":false},"gmt":"2017-08-03T15:14:13.000-04:00"},"sysusage":{"xmlns":"","memory":24.308594,"wallClockTime":72.93486,"cpuTime":4.026387},"seriesConfig":{"resourceHostname":"sdsc-comet","schedule":{"cron":{"wday":"*","min":13,"hour":"0-23/1","month":"*","mday":"*"},"numOccurs":-1,"suspended":false},"xmlns":"","series":{"args":{"arg":[{"name":"gateway","value":"no"},{"name":"shell","value":"/bin/sh"},{"name":"submitparam","value":""},{"name":"walllimit","value":10},{"name":"log","value":5},{"name":"poll","value":60},{"name":"scheduler","value":"slurm"},{"name":"verbose","value":1},{"name":"help","value":"no"},{"name":"type","value":""},{"name":"randomwait","value":0},{"name":"var","value":""},{"name":"queue","value":""},{"name":"showscript","value":"no"},{"name":"version","value":"no"},{"name":"exec","value":""},{"name":"timeout","value":".000001"},{"name":"account","value":"TG-IRI160006"},{"name":"nodes","value":"1::1"}]},"name":"cluster.batch.wrapper","context":"cluster.batch.wrapper -account=\"TG-IRI160006\" -exec=\"\" -gateway=\"no\" -help=\"no\" -log=\"5\" -nodes=\"1::1\" -poll=\"60\" -queue=\"\" -randomwait=\"0\" -scheduler=\"slurm\" -shell=\"/bin/sh\" -showscript=\"no\" -submitparam=\"\" -timeout=\".000001\" -type=\"\" -var=\"\" -verbose=\"1\" -version=\"no\" -walllimit=\"10\"","version":18,"uri":"http://inca.xsede.org/inca/xsede-repo/bin/cluster.batch.wrapper","nice":false},"nickname":"slurm-submit","targetHostname":"","action":"add","acceptedOutput":{"comparison":"errorMessage=='' || errorMessage=~'BATCH: Reporter submission timed out'","comparitor":"ExprComparitor","notifications":{"notification":{"notifier":"EmailNotifier","target":"FailTo:inca@sdsc.edu"}}},"tags":{"tag":["resource=comet.sdsc.xsede.org","name=slurm","software=slurm","version=0"]}},"stderr":{"xmlns":""},"seriesConfigId":{"xmlns":"","content":2005676},"seriesId":{"xmlns":"","content":2005675}},"xmlns:quer":"http://inca.sdsc.edu/dataModel/queryResults_2.0"}};


memoryData = report["quer:object"].reportDetails.sysusage.memory;
wallClockData = report["quer:object"].reportDetails.sysusage.wallClockTime;
cpuTimeData = report["quer:object"].reportDetails.sysusage.cpuTime;
verbose1 = report["quer:object"].reportDetails.report.args.arg[7].value;
help1 = report["quer:object"].reportDetails.report.args.arg[8].value;
version1 = report["quer:object"].reportDetails.report.args.arg[14].value;
ran1 = report["quer:object"].reportDetails.report.hostname;
log1 = report["quer:object"].reportDetails.report.log.system[0].message;
cron1 = report["quer:object"].reportDetails.seriesConfig.schedule.cron.min + " " + report["quer:object"].reportDetails.seriesConfig.schedule.cron.hour + " ";
cron2 = report["quer:object"].reportDetails.seriesConfig.schedule.cron.wday + report["quer:object"].reportDetails.seriesConfig.schedule.cron.month + report["quer:object"].reportDetails.seriesConfig.schedule.cron.mday;
cron3 = cron1 + cron2;
var sdscData = [["cron", cron3],[ "ran on",   ran1],[   "help",     help1],[  "log",   log1 ],[  "verbose",  verbose1],[  "version",  version1]]
