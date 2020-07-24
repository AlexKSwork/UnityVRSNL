using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CounterLandsOnTile : MonoBehaviour
{
    public GameObject counter;
    public GameObject tile;
    bool onTile;
    // Start is called before the first frame update
    //takes care of the collision of each side
    bool onGround;

    void OnTriggerStay(Collider col)
    {
        // the tag for the plane on the bottom
        if (col.tag == "Waypoints")
        {
            onTile = true;
            Debug.Log("Hit the tile");
        }
    }

    void OnTriggerExit(Collider col)
    {
        if (col.tag == "Waypoints")
        {
            onTile = false;
        }
    }
    public bool OnGround()
    {
        return onTile;
    }


}
