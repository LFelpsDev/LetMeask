import { useParams, useHistory } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
import { RoomCode } from "../components/RoomCode";
import deleteImg from "../assets/images/delete.svg";
import { database } from "../services/firebase";

import "../styles/room.scss";
import { Button } from "../components/Button";
// import { FormEvent, useState, useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";
// import { database } from "../services/firebase";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>(); // generic
  const history = useHistory();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    // para Deletar
    if (window.confirm("Tem certeza que voce deseja excluir esta pergunta ?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    // para responder
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    // para destacar
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetMeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img
                        src={checkImg}
                        alt="Marcar Pergunta como Respondida"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar Destaque a Pergunta" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover Pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
