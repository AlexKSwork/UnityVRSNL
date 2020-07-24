using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Dice : MonoBehaviour
{
    // out put the value of the side to text
    public GameObject movementManager;

    public Text txt;

    Rigidbody rb;

    bool hasLanded;
    bool thrown;

    //initial position where we throw dice from, able to reset to this position on reroll
    Vector3 initPosition;

    //dice sides 1-6
    public int diceValue;

    public DiceSide[] diceSides;

    void Start()
    {
        //setting the Rigidbody variable to the component
        rb = GetComponent<Rigidbody>();
        //setting the initial position variable to its actual position
        initPosition = transform.position;
        rb.useGravity = false;
    }
    //if its a button in a game, don't need update as we don't need to wait for particular input but for testing e.g. mouse click or enter key. Need to use Update
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            RollDice();
        }

        if (rb.IsSleeping() && !hasLanded && thrown)
        {
            hasLanded = true;
            rb.useGravity = false;
            SideValueCheck();

        }
        else if (rb.IsSleeping() && hasLanded && diceValue == 0)
        {
            RollAgain();
        }

    }

    //want to know if we have thrown the dice and if the dice has landed
    void RollDice()
    {
        if (!thrown && !hasLanded)
        {
            thrown = true;
            rb.useGravity = true;
            rb.AddTorque(Random.Range(0, 500), Random.Range(0, 500), Random.Range(0, 500));
        }
        else if (thrown && hasLanded)
        {
            Reset();
        }
    }

    void Reset()
    {
        transform.position = initPosition;
        thrown = false;
        hasLanded = false;
        rb.useGravity = false;
        // txt.text = null;
    }

    void RollAgain()
    {
        Reset();
        thrown = true;
        rb.useGravity = true;
        rb.AddTorque(Random.Range(0, 500), Random.Range(0, 500), Random.Range(0, 500));

    }

    void SideValueCheck()
    {
        diceValue = 0;
        foreach (DiceSide side in diceSides)
        {
            if (side.OnGround())
            {
                diceValue = side.sideValue;
                Debug.Log(diceValue + " has been rolled!");
                movementManager.GetComponent<Movement>().Test(diceValue);
                // txt.text = ("You rolled a " + diceValue.ToString());
            }
        }
       
    }
}
