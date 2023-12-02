package team1.wanderworld.Repositories;

import com.mongodb.BasicDBObject;
import com.mongodb.client.*;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Models.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

@Component
public class SearchRepoImplement implements SearchRepository{

    @Autowired
    public MongoClient client;

    @Autowired
    public MongoConverter converter;
    @Override
    public List<Post> FindInPosts(String text) {
        final List<Post> posts = new ArrayList<>();
        MongoDatabase database = client.getDatabase("WanderWorld");

        MongoCollection<Document> collection = database.getCollection("post");

        BasicDBObject regexQuery = new BasicDBObject();
        Pattern pattern = Pattern.compile(text, Pattern.CASE_INSENSITIVE);
        regexQuery.put("$regex", pattern);

        BasicDBObject searchQuery = new BasicDBObject("$or",
                Arrays.asList(
                        new BasicDBObject("content", regexQuery),
                        new BasicDBObject("hashtags", regexQuery)
                )
        );

        FindIterable<Document> result = collection.find(searchQuery);

        result.forEach(doc -> posts.add(converter.read(Post.class, doc)));
        return posts;
    }


    @Override
    public List<User> FindInUsers(String text) {
        final List<User> users = new ArrayList<>();
        MongoDatabase database = client.getDatabase("WanderWorld");

        MongoCollection<Document> collection = database.getCollection("user");

        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$search",
                        new Document("text",
                                new Document("query", text)
                                        .append("path", Arrays.asList("username")))),
                new Document("$limit", 1L)));

        result.forEach(doc -> users.add(converter.read(User.class, doc)));
        return users;
    }
}
