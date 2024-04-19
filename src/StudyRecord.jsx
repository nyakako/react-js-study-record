import { useEffect, useState } from "react";
import { fetchStudyRecords, insertStudyRecord } from "./utils/supabaseFuntions";

export const StudyRecord = () => {
  const [records, setRecords] = useState([]);
  const [recordTitle, setRecordTitle] = useState("");
  const [recordTime, setRecordTime] = useState(0);
  const [error, setError] = useState("");
  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function getStudyRecords() {
    const data = await fetchStudyRecords();
    setRecords(data);

    const totalTime = data.reduce(
      (accumulator, currentValue) =>
        parseInt(accumulator) + parseInt(currentValue.time),
      0
    );
    setTime(totalTime);
  }

  useEffect(() => {
    setIsLoading(true);
    getStudyRecords();
    setIsLoading(false);
  }, []);

  const onClickAddRecord = async () => {
    if (!recordTitle || !recordTime) {
      setError("入力されていない項目があります");
      return;
    }
    if (recordTime < 0) {
      setError("学習時間が不正です");
      return;
    }
    const newRecord = { title: recordTitle, time: recordTime };

    setIsLoading(true);
    await insertStudyRecord(newRecord);
    await getStudyRecords();
    setIsLoading(false);

    setRecordTitle("");
    setRecordTime(0);
    setError("");
  };

  const onChangeRecordTitle = (event) => setRecordTitle(event.target.value);
  const onChangeRecordTime = (event) => {
    const inputTime = event.target.value;
    const prevRecordTime = recordTime;
    setRecordTime(inputTime);
    setTime(time - parseInt(prevRecordTime) + parseInt(inputTime));
  };

  return (
    <>
      <h1>学習記録一覧</h1>
      <div>
        <label htmlFor="recordTitle">学習内容</label>
        <input
          type="text"
          id="recordTitle"
          value={recordTitle}
          onChange={onChangeRecordTitle}
        />
      </div>
      <div>
        <label htmlFor="recordTime">学習時間</label>
        <input
          type="number"
          id="recordTime"
          value={recordTime}
          min={0}
          onChange={onChangeRecordTime}
        />
        時間
      </div>
      <div>入力されている学習内容：{recordTitle}</div>
      <div>入力されている時間：{recordTime}時間</div>
      <button onClick={onClickAddRecord}>登録</button>
      <div>{error}</div>
      <div>合計時間：{time}/1000(h)</div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {records.map((record, index) => (
            <li key={index}>
              {record.title} {record.time}時間
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
