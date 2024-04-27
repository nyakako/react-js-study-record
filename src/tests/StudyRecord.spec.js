import React from "react";
import {
  fireEvent,
  logRoles,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { StudyRecord } from "../StudyRecord";
import { fetchStudyRecords } from "../utils/supabaseFuntions";

describe("StudyRecord Component Tests", () => {
  test("1.タイトルが表示されている", () => {
    render(<StudyRecord />);
    const title = screen.getByTestId("pageTitle");
    expect(title).toHaveTextContent("学習記録一覧");
  });

  test("2.登録ボタン押下時に学習記録が1つ増えている", async () => {
    render(<StudyRecord />);
    const testRecordTitle = "TestRecord";
    const testRecordTime = "7";
    const recordTitleInput = screen.getByTestId("recordTitle");
    const recordTimeInput = screen.getByTestId("recordTime");
    const addButton = screen.getByTestId("addRecordButton");
    const initialRecords = await fetchStudyRecords();

    fireEvent.change(recordTitleInput, { target: { value: testRecordTitle } });
    fireEvent.change(recordTimeInput, { target: { value: testRecordTime } });
    fireEvent.click(addButton);

    const renderedRecords = await waitFor(() =>
      screen.findAllByTestId("study-records")
    );
    expect(renderedRecords).toHaveLength(initialRecords.length + 1);

    // await waitFor(() => {
    //   const renderedRecords = screen.getAllByTestId("study-records");
    //   expect(renderedRecords).toHaveLength(initialRecords.length + 1);
    // });
  });

  test("3.削除ボタン押下時に学習記録が1つ減っている", async () => {
    render(<StudyRecord />);

    const initialRecords = await fetchStudyRecords();
    const removeButtons = await screen.findAllByRole("button", {
      name: "削除",
    });
    // test2で追加したレコードを削除
    const removeButton = removeButtons[removeButtons.length - 1];

    fireEvent.click(removeButton);

    const renderedRecords = await waitFor(() =>
      screen.findAllByTestId("study-records")
    );

    expect(renderedRecords).toHaveLength(initialRecords.length - 1);

    // await waitFor(() => {
    //   const renderedRecords = screen.getAllByTestId("study-records");
    //   expect(renderedRecords).toHaveLength(initialRecords.length - 1);
    // });
  });
  test("4.入力せず登録ボタン押下するとエラーが表示する", () => {
    render(<StudyRecord />);
    const addButton = screen.getByTestId("addRecordButton");
    fireEvent.click(addButton);

    const errorMessage = screen.getByText("入力されていない項目があります");
    expect(errorMessage).toBeInTheDocument();
  });

  // test("logRoles: アクセシブルネームを確認する", async () => {
  //   const { container } = render(<StudyRecord />);

  //
  //   const renderedRecords = await screen.getAllByTestId("study-records");
  //
  //   const addButton = screen.getByTestId("addRecordButton");
  //   fireEvent.click(addButton);
  //   logRoles(container);
  // });
});
