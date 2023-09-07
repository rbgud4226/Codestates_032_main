import React, { useState } from "react";
import axios from "axios"; 

function WritePost() {
  const [step, setStep] = useState(1);
  const [post, setPost] = useState({
    title: "", 
    content: "",
    images: [],
    wcTag: "",
    animalTag: "",
    areaTag: "",
  });


  export default WritePost;