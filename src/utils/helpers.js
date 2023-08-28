export function formatDate(timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion(question, author, authedUser) {
  if (author === "" || author === null){
    return{
      exist : false,
    }
  }
  const { id, optionOne, optionTwo, timestamp } = question
  const { name, avatarURL } = author

  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOneVotesPercentage = Math.round((question.optionOne.votes.length / totalVotes) * 100);
  const optionTwoVotesPercentage = Math.round((question.optionTwo.votes.length / totalVotes) * 100);
  const isOptionOneSelected = question.optionOne.votes.includes(authedUser);

  return {
    id,
    name,
    avatar: avatarURL,
    timestamp: formatDate(timestamp),
    hasUserAnswered:
      optionOne.votes.includes(authedUser) ||
        optionTwo.votes.includes(authedUser)
        ? true
        : false,
    optionOneText: question.optionOne.text,
    optionTwoText: question.optionTwo.text,
    optionOneVotesPercentage: optionOneVotesPercentage,
    optionTwoVotesPercentage: optionTwoVotesPercentage,
    isUserAuthor: author === authedUser ? true : false,
    exist : true,
    optionOneVotes : question.optionOne.votes.length,
    optionTwoVotes : question.optionTwo.votes.length,
    selectedChoice : isOptionOneSelected,
  }
}