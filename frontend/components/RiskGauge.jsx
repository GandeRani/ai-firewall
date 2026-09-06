"use client";


export default function RiskGauge({score}){


let level="";
let emoji="";


if(score <= 30){

level="SAFE";
emoji="🟢";

}

else if(score <=70){

level="WARNING";
emoji="🟡";

}

else{

level="DANGER";
emoji="🔴";

}



return (

<div className="
mt-6
bg-gray-900
p-6
rounded-xl
text-white
">


<h2 className="
text-xl
font-bold
">

Risk Level

</h2>



<div className="
text-5xl
font-bold
mt-4
">

{score}

</div>



<div className="
text-2xl
mt-3
">

{emoji} {level}

</div>



<div className="
w-full
bg-gray-700
h-4
rounded-full
mt-5
">


<div

className="
bg-red-500
h-4
rounded-full
"

style={{
width:`${score}%`
}}


/>


</div>



<div className="
flex justify-between
text-sm
mt-2
">

<span>
0 SAFE
</span>


<span>
50 WARNING
</span>


<span>
100 DANGER
</span>


</div>


</div>


)

}