import axios from 'axios'
import getSingleGroup from './getSingleGroup';
export default async function createGroup(postTitle, postContent, imageSrc, setShowPostModal, setGroups){

   
    try {
        const token = localStorage.getItem("userToken");
        const formData = new FormData();
        formData.append("name", postTitle);
        formData.append("description", postContent);
        
        
        if(imageSrc){
            const imgResponse = await fetch(imageSrc)
            const blob = await imgResponse.blob()
            formData.append("images", blob, 'image.jpg');
        }
        
        const response = await axios.post("https://academics.newtonschool.co/api/v1/linkedin/channel",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    projectID: 'f104bi07c490'
                }
            }

        )
        const send = response.data.data._id;
        if(send){
            getSingleGroup(send, setGroups)
        }
        
    } catch (error) {
        console.log(error);
    }
    finally{
        setShowPostModal(false)
    }
}