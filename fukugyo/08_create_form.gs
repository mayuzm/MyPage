/**
 * メンバー用アンケート（Googleフォーム）のひな形を作るスクリプト
 *
 * 使い方
 * 1. 「旅程デザイナーYui」のGoogleアカウントでログインした状態で https://script.google.com を開く
 * 2. 「新しいプロジェクト」を押し、最初からある文字をすべて消して、このファイルの中身を貼り付ける
 * 3. 上の「実行」を押す（初回だけ権限の確認が出るので「許可」する）
 * 4. 下の「実行ログ」に、フォームの編集用URLと回答用URLが表示される
 *
 * 注文が来たら、このひな形をGoogleフォーム上で「コピーを作成」し、
 * タイトルと説明文の「〇〇」を書き換えて使う。
 */
function createMemberSurvey() {
  const form = FormApp.create('〇〇旅行　みんなの希望アンケート（所要3分）');
  form.setDescription(
    '幹事の〇〇さんに代わって、行程表を作るプランナーです。3分ほどで答えられます。' +
    '回答はプランナーだけが見て、行程づくりにだけ使います（幹事さんやほかのメンバーには見えません）。'
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage('ご回答ありがとうございました。行程表の完成を楽しみにお待ちください。');

  // 1
  const q1 = form.addCheckboxItem()
    .setTitle('この旅で一番楽しみにしたいことは？（上位2つまで）')
    .setChoiceValues(['景色・自然', '食べ物', '観光名所', '体験・アクティビティ', '温泉・のんびり', '買い物', 'みんなで話す時間'])
    .setRequired(true);
  q1.setValidation(FormApp.createCheckboxValidation()
    .requireSelectAtMost(2)
    .setHelpText('2つまで選んでください')
    .build());

  // 2
  form.addParagraphTextItem().setTitle('絶対に行きたい場所・やりたいことはありますか？').setRequired(false);

  // 3
  form.addParagraphTextItem().setTitle('食べたいもの').setRequired(false);

  // 4
  form.addMultipleChoiceItem()
    .setTitle('1日にどのくらい歩けそうですか？')
    .setChoiceValues(['たくさん歩いても平気', 'ほどほど（1万歩くらい）', 'なるべく歩きたくない'])
    .setRequired(true);

  // 5
  form.addMultipleChoiceItem()
    .setTitle('宿に泊まった翌朝は、何時なら出発できますか？')
    .setHelpText('身支度を済ませて宿を出られる時刻です。何泊でも同じ時刻の目安で大丈夫です。日帰りの場合は空欄で大丈夫です。')
    .setChoiceValues(['7時台', '8時台', '9時台', '10時以降'])
    .setRequired(false);

  // 6
  form.addMultipleChoiceItem()
    .setTitle('旅のペースはどちらが好み？')
    .setChoiceValues(['いろいろ回りたい', '少ない場所でゆっくりしたい', 'どちらでもいい'])
    .setRequired(true);

  // 7
  const q7 = form.addCheckboxItem()
    .setTitle('苦手なこと・避けたいことは？（いくつでも）')
    .setRequired(true);
  q7.setChoices([
    q7.createChoice('長時間の移動'),
    q7.createChoice('人混み'),
    q7.createChoice('高い所'),
    q7.createChoice('乗り物酔い'),
    q7.createChoice('特になし'),
  ]);
  q7.showOtherOption(true);

  // 8
  form.addParagraphTextItem().setTitle('その他、伝えたいこと').setRequired(false);

  Logger.log('編集用URL: ' + form.getEditUrl());
  Logger.log('回答用URL: ' + form.getPublishedUrl());
}
