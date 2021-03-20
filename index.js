let req = new XMLHttpRequest();
var json_data= {};

function main(){
    var option= document.getElementById("options").value;
    

    if(option=="branch"){
        
        document.getElementById("rank").style.display="block";
        document.getElementById("gender").style.display="block";
        document.getElementById("caste").style.display="block";
        document.getElementById("button").style.display="block";
        document.getElementById("branch").style.display="block";
    }else{
        document.getElementById("rank").style.display="block";
        document.getElementById("gender").style.display="block";
        document.getElementById("caste").style.display="block";
        document.getElementById("button").style.display="block";
        document.getElementById("branch").style.display="block";
        document.getElementById("branch").style.display="none";
    }
    var btn=document.getElementsByClassName('btn');
btn[0].addEventListener("click",function(){
    
    var checked_caste= document.querySelectorAll('input[name="CASTE"]:checked');
    var caste;
    var checked_gender= document.querySelectorAll('input[name="GENDER"]:checked');
    var gender;
    var submit;
    var branch='';
    if(option=="branch"){
        var checked_branch= document.querySelectorAll('input[name="BRANCH"]:checked');
        
        if(checked_branch.length>0){
            branch=checked_branch[0].value;
        }
    }
    
   
    
    
    if(checked_caste.length>0 && checked_gender.length>0 ){
        
        caste = checked_caste[0].value;
        gender= checked_gender[0].value;
        submit=true;
    
    } else{
        alert("Choose the options and submit");
        submit=false;
    }
    var checked_rank=document.querySelector('input[type="number"]');
    var rank=checked_rank.value;
    if(!rank.length){
        alert("Give your rank");
        submit=false;
    }else{
        submit=true;
        rank=parseInt(rank);
    }
   
    var cst=caste+" "+gender;
    
    if(submit){
        //getting the data from web server JSONBIN.io

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            json_data = JSON.parse(req.responseText);
            
            if(branch==''){
                var new_json=JSON.parse(JSON.stringify(get_data_no_branch(json_data,rank,cst)));
            }else{
                var new_json=JSON.parse(JSON.stringify(get_data_w_branch(json_data,rank,cst,branch)));
            }
            
            var res =[];
            var len=(Object.keys(new_json).length);
            for(let i =0; i< len; i++){
                res.push(new_json[i]);
            }
           
            res.sort(function (a,b){
               return a[cst] - b[cst];
            })
        
            render_data(res,cst, rank);
        }
    };
  
    req.open("GET", "https://api.jsonbin.io/b/604086e20866664b108865c9", true);
    //req.setRequestHeader("secret-key", "secret");
    req.send();

        
    }
});

}

function get_data_w_branch(json_data1,rank,caste,branch){
    var new_data= {};
    var j=0;
 
    for(let i=0;i< json_data1.length; i++){
          if(json_data1[i].BRANCH==branch && json_data1[i][caste] >= (rank-1000) && json_data1[i][caste]<=rank+20000){
              new_data[j]= json_data[i];
              j++;
          }
    }
    return new_data;
}

function get_data_no_branch(json_data1,rank,caste){
    var new_data= {};
    var j=0;

    for(let i=0;i< json_data1.length; i++){
          if(json_data1[i][caste] >= (rank-1000) && json_data1[i][caste]<=rank+10000){
              new_data[j]= json_data[i];
              j++;
          }
    }
    return new_data;
}

function render_data(json_file,caste,rank) {
    var labels1= [];
    var data1= [];
    var data2= [];
    var len=(json_file.length);
    for(let  i=0; i<len; i++){
        labels1.push(json_file[i]["INST CODE"]);
        if(rank > json_file[i][caste]){
         
          data1.push(json_file[i][caste]);
        data2.length++;
         }
          else{
            data2.push(json_file[i][caste]); 
            data1.length++;
          }
    }

    // console.log(data);
    // console.log(labels);
    if(window.myChart instanceof Chart)
    {
        window.myChart.destroy();
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels1,
        datasets: [{
            label: 'Safe Colleges',
            data: data2,
            backgroundColor: 
                'rgba(0, 0, 0, 0.2)',
            borderColor: 
                'rgba(0, 0, 0, 1)',
            borderWidth: 1,
            spanGaps: false
        },{
            label: 'Ambitious Colleges',
            data: data1,
            backgroundColor: 
                'rgba(200, 120, 132, 0.2)',
            borderColor: 
                'rgba(200, 120, 64, 1)',
            borderWidth: 1,
            spanGaps: false
        }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 2,
      scales: {
        xAxes: [ {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'College ID'
          },
          ticks: {
            major: {
              fontStyle: 'bold',
              fontColor: '#FF0000'
            }
          }
        } ],
        yAxes: [ {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'CutOFF'
          }}]
    } 
    
    }});
    render_table(json_file,caste);
}

function render_table(json_file,caste){
    var table = document.getElementById('mytable');
    table.innerHTML='';
    var th1=document.createElement('th');
    var th2=document.createElement('th');
    var th3=document.createElement('th');
    var tr=document.createElement('tr');
    var textnode1 = document.createTextNode("College Name");
    var textnode2 = document.createTextNode("Branch");
    var textnode3 = document.createTextNode("Cut-Off");
    th1.appendChild(textnode1);
    th2.appendChild(textnode2);
    th3.appendChild(textnode3);
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    table.appendChild(tr);

    for (var i = 1; i < json_file.length; i++){
        var tr1=document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');

        var text1 = document.createTextNode(json_file[i]['INSTITUTE NAME']);
        var text2 = document.createTextNode(json_file[i]['BRANCH NAME']);
        var text3 = document.createTextNode(json_file[i][caste]);

        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr1.appendChild(td3);

        table.appendChild(tr1);
    }
}
