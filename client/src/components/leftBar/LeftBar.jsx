import "./leftBar.scss";
import Friends from "../../assets/1.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { useQuery } from '@tanstack/react-query';
import { apiConfig } from "../../API/apiConfigs";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading: fIsLoading, error: fError, data: friends } = useQuery({
    queryKey: ['friends', currentUser.id],
    queryFn: async () => {
      const res = await apiConfig.get(`/v1/friends?userId=${currentUser.id}`);
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching friends:", err);
    }
  });

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="item">
            <AiFillHome className="homeIcon" />
            <span>Home</span>            
          </div>
          <hr/>
          <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: "none" }}>
            <div className="user">
              <img
                src={currentUser.profilePicture ? `/upload/${currentUser.profilePicture}` : "/upload/user.png"}
                alt="Profile"
              />
              <span>{currentUser.name}</span>
            </div>
          </Link>
          <hr/>
          <div >
          
    <div className="listFriend">

      <div className="container">        
        <div className="yourFriends">
        <div className="friendContainer">
    <img src={Friends} alt="Friends" className="friendImage" />
    <span className="menuFriend">Following</span>  
</div>
     
          {fIsLoading ? (
            "Loading..."
          ) : fError ? (
            <div>Error loading friends: {fError.message}</div>
          ) : (friends && Array.isArray(friends)) ? (
            friends.map(friend => (
              <Link to={'/profile/' + friend.userId} style={{ textDecoration: "none" }} key={friend.userId}>
                <div className="friend">
                  <div className="friendInfo">
                    <img
                      src={friend.profilePicture ? "/upload/" + friend.profilePicture : "/upload/user.png"}
                      alt=""
                    />
                    <div className="online" />
                    <span className="friendName">{friend.name}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div>No friends found.</div>
          )}
       
      </div>
    </div>
    </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default LeftBar;
