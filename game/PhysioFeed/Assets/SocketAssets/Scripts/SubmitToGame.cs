using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SubmitToGame : MonoBehaviour
{
    public void PlayGame()
    {   
        new WaitForSeconds(5);
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
    }
}
