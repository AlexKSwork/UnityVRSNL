using System.Collections;
using System.Collections.Generic;
using UnityEngine;
// using Cardboard;

public class DisableVR : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        ToggleVRMode();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void ToggleVRMode() {
        // Cardboard.SDK.VRModeEnabled = !Cardboard.SDK.VRModeEnabled;
        Screen.orientation = ScreenOrientation.Portrait;
        UnityEngine.XR.XRSettings.enabled = false;
    }
}
