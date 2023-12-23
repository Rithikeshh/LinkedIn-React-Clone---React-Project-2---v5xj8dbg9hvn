export default async function postComment(id){
    const token = localStorage.getItem("userToken");
    const config = {
        method: 'POST',
        headers: {
          "projectID": 'f104bi07c490',
          "Authorization": `Bearer ${token}`
        },
        body: {
            'content': 'Hello, what a beautyful day'
        }
    }
    console.log(id);
    try {
        const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/comment/${id}`, config)
        console.log(response);
        const result = await response.json();
        console.log(result);
        
    } catch (error) {
        console.log(error);
    }
      
}