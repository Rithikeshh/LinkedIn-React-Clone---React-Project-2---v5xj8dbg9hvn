import axios from 'axios'
export default async function deletePost(id){
    const token = localStorage.getItem("userToken");
    
    try {
        const result = await axios.delete(`https://academics.newtonschool.co/api/v1/linkedIn/post/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    projectID: 'f104bi07c490'
                }
            }
        )
        
    } catch (error) {
        console.log(error);
    }
}