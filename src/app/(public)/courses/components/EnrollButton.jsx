"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import Swal from "sweetalert2";
export default  function EnrollButton({course}) {
    const {price,title,_id}=course
     const { data: session } = useSession();
        const handleEnroll = async () => {
    if (!session?.user?.email) {
       redirect("/login");
    }
    const result = await Swal.fire({
      title: "Confirm Payment",
      text: `Pay $${price} to enroll "${title}"?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2563eb",
    });

    if (!result.isConfirmed) return;

    // ⏳ Loading
    Swal.fire({
      title: "Processing Payment...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

      try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          courseId: _id,
        }),
      });

      const data = await res.json();

      Swal.close();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Enrolled Successfully 🎉",
          text: "You are now enrolled in this course",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Enrollment Failed",
          text: data.error || "Something went wrong",
        });
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later",
      });
    }
}
   

    
  return (
    <div><button className='btn btn-primary btn-xl'  onClick={handleEnroll} >Enroll Now</button></div>
  )
}
