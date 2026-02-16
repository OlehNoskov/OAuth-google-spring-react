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
            fields: [
              'title',
              'title._2gram',
              'title._3gram'
            ],
          },
        },
      ],
      should: [
        // 1️⃣ STARTS WITH query (highest priority)
        {
          prefix: {
            title: {
              value: searchKeyword.toLowerCase(),
              boost: 20,
            },
          },
        },

        // 2️⃣ WORD starts with query
        {
          match_phrase: {
            title: {
              query: searchKeyword,
              boost: 10,
            },
          },
        },

        // 3️⃣ CONTAINS query anywhere
        {
          match: {
            title: {
              query: searchKeyword,
              boost: 3,
            },
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