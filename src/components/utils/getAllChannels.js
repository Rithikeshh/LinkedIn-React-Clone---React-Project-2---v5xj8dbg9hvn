import axios from 'axios'

export default async function getAllChannels(setSuggestedGroups, setLoading){

    try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get('https://academics.newtonschool.co/api/v1/linkedin/channel?limit=50',
            {
                headers: {
                    projectID: 'f104bi07c490'
                }
            }
        )
        
        setSuggestedGroups(response.data.data)
        setLoading(false)
    } catch (error) {
        console.log(error);
    }
}