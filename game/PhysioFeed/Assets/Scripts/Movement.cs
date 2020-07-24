using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Movement : MonoBehaviour
{


    public GameObject counter;
    public GameObject gameManager;

    public List<GameObject> waypoints = new List<GameObject>();

    public List<GameObject> ladders = new List<GameObject>();
    public List<GameObject> end_ladders = new List<GameObject>();
    public List<GameObject> snakes = new List<GameObject>();
    public List<GameObject> end_snakes = new List<GameObject>();


    public int waypointIndex = 0;


    public void Test(int value)
    {
        Debug.Log(value);
        waypointIndex = waypointIndex + value;

        if (waypointIndex == 3)
            waypointIndex = 19;

        if(waypointIndex == 7)
            waypointIndex = 12;

        if(waypointIndex == 9)
            waypointIndex = 30;

        if(waypointIndex == 15)
            waypointIndex = 1;

        if(waypointIndex == 21)
            waypointIndex = 13;

        if(waypointIndex == 32)
            waypointIndex = 17;

        if(waypointIndex >= 33)
            waypointIndex = 33;

        counter.transform.position = waypoints[waypointIndex].transform.position;
        Debug.Log(waypoints.Count);

        gameManager.GetComponent<GameBoard>().MovePlayer();
    }
}
