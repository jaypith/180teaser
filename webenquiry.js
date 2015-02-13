function validateform(formname)
            {
                    var requiredfields=document.getElementById("required").value;
                    
                    if(requiredfields!="")
                    {
                        if(requiredfields.indexOf(",")>0) // if multiple variable
                        {
                            rarr=requiredfields.split(",");

                            for(rc=0;rc<rarr.length;rc++)
                            {

                                var fcond='document.getElementById("' + rarr[rc] + '").value==""';
                                
                                if(eval(fcond)==true)
                                {
                                    alert("Missing : " + rarr[rc]);
                                    return false;
                                }
                            }
                        }
                        else // if single variable
                        {
                            if(eval('document.getElementById("' + requiredfields + '").value==""')==true)
                            {
                                    alert("Missing : " + requiredfields);
                                    return false;
                            }   
                        }
                    }
                   $(formname).submit(function(e)
                    {
                              $.ajax({
                                   url: 'http://www.digitalmarketingbox.com/unoapp/webform_ops.php',
                                    type: 'POST',
                                    data:  new FormData(this),
                                    mimeType:"multipart/form-data",
                                    contentType: false,
                                    cache: false,
                                    processData:false,
                                    dataType: "json",
                                    success: function(data, textStatus, jqXHR)
                                    {
                                        if(data["Result"]=="Success")
                                        {   
                                           $(formname).html(data["Msg"]);    
                                        } 
                                        else
                                        {
                                            alert(data[Msg]);
                                        }                                 
                                    },
                                    error:function()
                                    {
                                        alert("Error : Please contact UNOapp");
                                    }
                            }); 
                            e.preventDefault(); //Prevent Default action. 
                    });
            }