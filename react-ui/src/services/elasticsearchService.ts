import axios from "axios";
import { SuggestionInterface } from "../interfaces/SuggestionInterface";

export const getSuggestions = async (searchKeyword: string, userEmail: string): Promise<SuggestionInterface[]> => {
try {
  const response = await axios.post('/search', {
    query: {
      bool: {
        filter: [
          {
            term: {
              'owners.keyword': userEmail,
            },
          },
        ],
        must: [
          {
            multi_match: {
              query: searchKeyword,
              type: 'bool_prefix',
              fields: ['title', 'title._2gram', 'title._3gram'],
            },
          },
        ],
      },
    },
  });

    const hits = response.data.hits.hits || [];
    const suggestions = hits.map((hit: any) => ({
      id: hit._source.id,
      title: hit._source.title,
    }));

    return suggestions;
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        throw error;
    }
};