import { FaEdit } from "react-icons/fa";

function Profil({ userSession, setUserSession }) {

    const handleEditBio = ()=>{}

    return (
        <div className="profil">
            <h1>{userSession.username}</h1>
            <h2>{userSession.email}</h2>
            <div>bio :
                <span>
                    {
                        (userSession.bio === null || userSession.bio === "") ? 'Empty' : userSession.bio
                    }
                </span>
                <FaEdit onClick={handleEditBio}/>

            </div>
        </div>
    )
}

export default Profil;