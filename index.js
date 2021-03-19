let req = new XMLHttpRequest();
var Chart = require('chart.js');
var json_data= {};




var btn=document.getElementsByClassName('btn');
btn[0].addEventListener("click",function(){
    var checked_branch= document.querySelectorAll('input[name="BRANCH"]:checked');
    var branch;
    var checked_caste= document.querySelectorAll('input[name="CASTE"]:checked');
    var caste;
    var checked_gender= document.querySelectorAll('input[name="GENDER"]:checked');
    var gender;
    
    var submit;
    if(checked_branch.length>0 && checked_caste.length>0 && checked_gender.length>0 ){
        branch= checked_branch[0].value;
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
    console.log(rank);
    var cst=caste+" "+gender;
    console.log(branch);
    if(submit){
        //getting the data from web server JSONBIN.io

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
        json_data = JSON.parse(req.responseText);
        console.log(json_data);
        var new_json=JSON.parse(JSON.stringify(get_data(json_data,rank,cst,branch)));
        console.log(new_json);
        render_data(new_json,cst);
        }
    };
  
    req.open("GET", "https://api.jsonbin.io/b/604086e20866664b108865c9", true);
    //req.setRequestHeader("secret-key", "secret");
    req.send();

        
    }
});

function get_data(json_data1,rank,caste,branch){
    var new_data= {};
    var j=0;
    console.log(rank);
    console.log(caste);
    console.log(branch);
    console.log(json_data1.length)
    for(let i=0;i< json_data1.length; i++){
          if(json_data1[i].BRANCH==branch && json_data1[i][caste] >= rank && json_data1[i][caste]<=rank+20000){
              new_data[j]= json_data[i];
              j++;
          }
    }
    return new_data;
}

function render_data(json_file,caste){
    var labels= [];
    var data= [];
    var len=(Object.keys(json_file).length);
    for(let  i=0; i<len; i++){
          labels.push(json_file[i]["INST CODE"]);
          data.push(json_file[i][caste]);
    }
    console.log(data);
    console.log(labels);
    if(window.myChart instanceof Chart)
    {
        window.myChart.destroy();
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'College list',
            data: data,
            backgroundColor: 
                'rgba(255, 99, 132, 0.2)',
            borderColor: 
                'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }]
    }
    
});
}
