using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DG.Tweening;
using TMPro;
using UnityStandardAssets.Utility;

public class GameBoard : MonoBehaviour
{
    [SerializeField] private QuestionManager questionManager;

    [SerializeField] private GameObject gameControlPanel;

    [SerializeField] private TextMeshProUGUI questionText;
    [SerializeField] private TextMeshProUGUI timerText;

    [SerializeField] private float cameraPanDuration = 1.5f;
    [SerializeField] private Vector3 cameraBoardPosition = new Vector3(-5.03f, 10.1f, -10f);
    [SerializeField] private Vector3 cameraBoardRotation = new Vector3(40f, 180f, 0f);
    [SerializeField] private Vector3 cameraScreenPosition = new Vector3(-5.03f, 10.1f, -6.1f);
    [SerializeField] private Vector3 cameraScreenRotation = new Vector3(0f, 180f, 0f);

    [SerializeField] private float questionTime = 10;

    private int totalTiles = 1000;

    private int playerPosition;

    public GameObject mainCamera;

    private List<BoardTile> boardTiles = new List<BoardTile>();

    private float questionTimer;






    

    void Start()
    {

        CreateBoard();

        PanCameraToBoard();
    }

    private void CreateBoard()
    {
        for(int i = 0; i < totalTiles; i++)
        {
            boardTiles.Add(new BoardTile(true));
        }
    }

    public void MovePlayer()
    {
        int diceRoll = Random.Range(1, 6);
        playerPosition += diceRoll;

        BoardTile tile = boardTiles[playerPosition];

        if (tile.HasQuestion())
        {
            PanCameraToScreen();
            gameControlPanel.SetActive(false);
        }
    }

    private void ShowQuestion()
    {
        questionText.text = questionManager.GetRandomQuestion();
        StartCoroutine(StartTimer(questionTime));
    }


    private IEnumerator StartTimer(float value)
    {
        questionTimer = value;
        while (questionTimer > 0)
        {
            timerText.text = "" + questionTimer;
            yield return new WaitForSeconds(1.0f);
            questionTimer--;
        }

        questionText.text = "";
        timerText.text = "";

        PanCameraToBoard();
    }

    private void ResumeGame()
    {
        gameControlPanel.SetActive(true);
    }

    private void PanCameraToScreen()
    {

        GameObject.Find("Main Camera").GetComponent<SimpleMouseRotator>().enabled = false;
        Sequence cameraSequence = DOTween.Sequence();
        cameraSequence.Append(Camera.main.transform.DORotate(cameraScreenRotation, cameraPanDuration));
        cameraSequence.Insert(0, Camera.main.transform.DOMove(cameraScreenPosition, cameraPanDuration));
        cameraSequence.OnComplete(ShowQuestion);
    }

    private void PanCameraToBoard()
    {
        Sequence cameraSequence = DOTween.Sequence();
        cameraSequence.Append(Camera.main.transform.DORotate(cameraBoardRotation, cameraPanDuration));
        cameraSequence.Insert(0, Camera.main.transform.DOMove(cameraBoardPosition, cameraPanDuration));
        cameraSequence.OnComplete(ResumeGame);
    GameObject.Find("Main Camera").GetComponent<SimpleMouseRotator>().enabled = true;    }

}
