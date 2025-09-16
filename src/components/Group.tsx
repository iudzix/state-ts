import { useState } from "react";

export default funtion Group (){
return (
        {BUS_MEMBERS.map((member,index) => (
          
            <li key={index}
              className ={member.group === "BUS" ? "red-txt" : "blue-txt"}>
              {member.nameTH} ({member.nameEN})
                <img src={member.imageUrl} width='100' />
            </li>
        ))}
    );
}
