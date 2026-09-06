"use client";

import Link from "next/link";


export default function Navbar(){

return(

<nav
className="
w-full
bg-gray-950
border-b
border-gray-800
p-5
flex
justify-between
items-center
text-white
"
>


<h1 className="
text-2xl
font-bold
">

🛡️ AI Firewall

</h1>



<div className="
flex
gap-8
">


<Link href="/">
Home
</Link>


<Link href="/dashboard">
Dashboard
</Link>


<Link href="/test">
Test Scanner
</Link>


</div>


</nav>

)

}