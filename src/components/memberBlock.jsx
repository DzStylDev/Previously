import axios from "axios"

export default function Members() {

    // const [dataUser, setDataUser] = useState([]);
    // const [getUsers, setUsers] = useState([]);

    const listBLockOfUser = () => {

        axios.get('https://api.betaseries.com/members/info', {
            params: {
                // id: u.id
            },
        }).then(axiosReponse => {
            console.log(axiosReponse.data)
        })
    }

    // useEffect(() => {
    //     listBLockOfUser();
    // }, []);
    return (
        <>
            {/* <div className="wrapper">
                < Header />
                <main className="mainHome">
                    {getUsers.map((users, index) => {
                        return (
                            <main className="blok-container" key={index}>
                                {users.map((user, index) => {
                                    //  onMouseEnter={(e) => mouseOver(e)
                                    return (
                                        <div key={index} className="container-friend">
                                            <div className="member-title">{user.login}</div>
                                            {
                                                user.in_account === true
                                                    ?
                                                    <button disabled className="button_ajout_isFriend">Déjà en ami</button>
                                                    :
                                                    <button className="button_ajout" onClick={() => addFriend(user)}>Ajouter en ami</button>
                                            }
                                            <div className="groupe-member-options">
                                                <div className="member-account">
                                                    {
                                                        user.in_account === true
                                                            ?
                                                            <img src={require("../asset/boutonVert.png")} className="btnAdd2" alt="icone vert" />
                                                            :
                                                            <img src={require("../asset/boutonRouge.png")} className="btnAdd2" alt="icone rouge" />

                                                    }
                                                </div>
                                                <div className="member-container-xp">
                                                    <div className="xp_title">{user.xp}</div>
                                                    <img src={require('../asset/xp.png')} alt="xp" className="btnAdd2" />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </main>
                        )
                    }
                    )}
                </main>
            </div> */}
        </>
    )
}