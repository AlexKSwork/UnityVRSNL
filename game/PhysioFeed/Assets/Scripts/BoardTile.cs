using System.Collections;
using System.Collections.Generic;

public class BoardTile
{
    private bool hasQuestion;

    public BoardTile(bool hasQuestion)
    {
        this.hasQuestion = hasQuestion;
    }

    public bool HasQuestion()
    {
        return hasQuestion;
    }
}
