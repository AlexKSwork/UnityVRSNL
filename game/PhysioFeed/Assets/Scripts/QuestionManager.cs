using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

[Serializable]
public class QuestionData
{
    public bool success;
    public List<QuestionBlock> data;
}

[Serializable]
public class QuestionBlock
{
    public string _id;
    public string question1;
    public string question2;
    public string question3;
    public string question4;
    public string question5;
    public string question6;
    public string question7;
    public string question8;
    public string question9;
    public string question10;
    public string createdAt;
    public string updatedAt;
    public int id;
    public int __v;
}

public class QuestionManager : MonoBehaviour
{
    [SerializeField]
    private string dataURL = "http://localhost:3001/api/getData";

    List<string> questionList;

    private void Start()
    {
        StartCoroutine(RequestQuestionData(dataURL));
    }

    IEnumerator RequestQuestionData(string url)
    {
        UnityWebRequest www = UnityWebRequest.Get(url);
        www.downloadHandler = new DownloadHandlerBuffer();

        questionList = new List<string>();
        questionList.Add("While working with a collegue you see that their notes are not up to date, WHAT DO YOU DO?");
        questionList.Add("What should you consider before introducing a new approach into your practise");
        questionList.Add("A patient asks you out on a date, WHAT SHOULD YOU DO");
        questionList.Add("Budget cuts mean that patients only get 5 treatments, your patient needs 6, WHAT DO YOU DO?");
        questionList.Add("A patient is refusing treatment from you on the grounds of your ethnicity. WHAT SHOULD YOU DO?");
        questionList.Add("You discover that your new patient does not speak english. WHAT DO YOU DO?");
        questionList.Add("A competent patient is refusing treatment. WHAT SHOULD YOU DO?");
        questionList.Add("A patient send you a 'Friend' request on Facebook, WHAT SHOULD YOU DO?");
        questionList.Add("Your patient tells you in confidence that they are HIV+, what do you do?");
        questionList.Add("EXAMPLE QUESTION");
        questionList.Add("EXAMPLE QUESTION");

        yield return www.SendWebRequest();

        while (!www.downloadHandler.isDone)
        {
            yield return new WaitForEndOfFrame();
        }

        if (www.isNetworkError)
        {
            Debug.Log(www.error);
            

        }
        else
        {
            string results = www.downloadHandler.text;
            Debug.Log(results);
            QuestionData questionData = JsonUtility.FromJson<QuestionData>(results);
            CreateQuestionList(questionData);
        }

        yield break;
    }

    private void CreateQuestionList(QuestionData questionData)
    {
        questionList = new List<string>();

        foreach (QuestionBlock questionBlock in questionData.data)
        {
            questionList.Add(questionBlock.question1);
            questionList.Add(questionBlock.question2);
            questionList.Add(questionBlock.question3);
            questionList.Add(questionBlock.question4);
            questionList.Add(questionBlock.question5);
            questionList.Add(questionBlock.question6);
            questionList.Add(questionBlock.question7);
            questionList.Add(questionBlock.question8);
            questionList.Add(questionBlock.question9);
            questionList.Add(questionBlock.question10);
        }
    }

    public string GetRandomQuestion()
    {
        if (questionList.Count > 0)
        {
            int index = UnityEngine.Random.Range(0, questionList.Count);
            string question = questionList[index];
            questionList.Remove(question);
            return question;
        } 
        else
        {
            Debug.LogError("Out of questions");
            return "";
        }
    }

}
