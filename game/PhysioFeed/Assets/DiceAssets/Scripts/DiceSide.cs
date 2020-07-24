using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DiceSide : MonoBehaviour
{
    //takes care of the collision of each side
    bool onGround;

    public int sideValue;

    void OnTriggerStay(Collider col)
    {
        // the tag for the plane on the bottom
        if(col.tag == "Ground")
        {
            onGround = true;
        }
    }

    void OnTriggerExit(Collider col)
    {
        if(col.tag == "Ground")
        {
            onGround = false;
        }
    }
    public bool OnGround()
    {
        return onGround;
    }

}
