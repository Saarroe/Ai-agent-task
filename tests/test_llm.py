from unittest.mock import Mock, patch

from ai_agent_task.app.agents.llm import parse_task


def test_parse_task_falls_back_when_openai_fails(monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "fake-key")
    monkeypatch.setenv("OPENAI_MODEL", "fake-model")

    mock_client = Mock()
    mock_client.responses.create.side_effect = Exception("OpenAI unavailable")

    with patch(
        "ai_agent_task.app.agents.llm.OpenAI",
        return_value=mock_client,
    ):
        result = parse_task("Gym tomorrow at 6")

    assert result.title == "Gym tomorrow at 6"
    assert result.date is None