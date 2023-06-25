import { ActivityIndicator, Text } from 'react-native'
import { useSearchParams } from 'expo-router'
import Tweet from '../../../../../components/Tweet'
import tweets from '../../../../../assets/data/tweets'
import { useQuery } from '@tanstack/react-query'
import { useTweetsApi } from '../../../../../lib/api/tweets';

const Page = () => {
  const { id } = useSearchParams()
  const { getTweet } = useTweetsApi();

  const { data, isLoading, error } = useQuery({
    queryKey: ['tweet', id],
    queryFn: () => getTweet(id as string),
  })

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Tweet {id} not found!</Text>
  }

  return <Tweet tweet={data} />
}

export default Page
