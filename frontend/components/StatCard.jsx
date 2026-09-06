export default function StatCard({
title,
value,
icon
}){

return(

<div className="
bg-gradient-to-br
from-gray-900
to-gray-800
p-6
rounded-xl
shadow-lg
border
border-gray-700
">


<div className="text-gray-400">
{icon} {title}
</div>


<div className="
text-4xl
font-bold
mt-3
text-white
">

{value}

</div>


</div>

)

}