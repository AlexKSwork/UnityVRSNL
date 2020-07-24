using SocketIO;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class NetworkManager : MonoBehaviour
{

    public static NetworkManager instance;
    public Canvas canvas;
    public SocketIOComponent socket;
    public InputField inputField;
    public GameObject sceneNav;


    void Awake()
    {
        if (instance == null)
        {
            instance = this;
        }

        else if (instance != this)
        {
            Destroy(gameObject);
            DontDestroyOnLoad(gameObject);
        }
    }

    // Start is called before the first frame update
    void Start()
    {

        socket.On("player connect", OnPlayerConnected);
        socket.On("play", OnPlay);
        socket.On("player disconnect", OnPlayerDisconnected);
        
    }
    //This called when input field is filled in and click submit button
    public void JoinGame()
    {
        StartCoroutine(ConnectToServer());
    }

    #region Commands
    //thread basically
    IEnumerator ConnectToServer()
    {
        yield return new WaitForSeconds(0.5f);

        socket.Emit("player connect");

        yield return new WaitForSeconds(1f);

        string playerName = inputField.text;
        //can add more things here say a square on the board
        PlayerJSON playerJSON = new PlayerJSON(playerName);
        string data = JsonUtility.ToJson(playerJSON);
        socket.Emit("play", new JSONObject(data));

        yield return new WaitForSeconds(1f);

        sceneNav.GetComponent<SubmitToGame>().PlayGame();
        //can turn off a canvas using canvas.gameObject.SetActive(false);
    }

    #endregion

    #region Listening

    void OnPlayerConnected(SocketIOEvent socketIOEvent)
    {
        print("Player Connected");
        string data = socketIOEvent.data.ToString();
        UserJSON userJson = UserJSON.CreateFromJSON(data);
    }

    void OnPlay(SocketIOEvent socketIOEvent)
    {
        print("You Joined");
        string data = socketIOEvent.data.ToString();
        UserJSON currentUserJSON = UserJSON.CreateFromJSON(data);

    }

    void OnPlayerDisconnected(SocketIOEvent socketIOEvent)
    {

    }


    #endregion

    #region JSONMessageClasses

    //happens first when the player clicks the button, send server a message (name)
    [System.Serializable]
    public class PlayerJSON
    {
        public string name;

        public PlayerJSON(string _name)
        {
            name = _name;
        }

    }

    [System.Serializable]
    public class UserJSON
    {
        public string name;

        public static UserJSON CreateFromJSON(string data)
        {
            return JsonUtility.FromJson<UserJSON>(data);
        }
    }

    #endregion

}
