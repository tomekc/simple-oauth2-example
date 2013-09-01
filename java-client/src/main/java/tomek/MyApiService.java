package tomek;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.scribe.builder.api.DefaultApi20;
import org.scribe.model.*;

import java.io.IOException;

/**
 * Created by tomek
 */
public class MyApiService extends DefaultApi20 {

    public static Token getToken(String username, String password, String clientId, String clientSecret) throws IOException {

        Request request = new Request(Verb.POST, (new MyApiService()).getAccessTokenEndpoint());
        request.addBodyParameter("username", username);
        request.addBodyParameter("password", password);
        request.addBodyParameter("grant_type", "password");
        request.addBodyParameter("client_id", clientId);
        request.addBodyParameter("client_secret", clientSecret);

        Response response = request.send();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(response.getBody());

        return new Token(node.get("access_token").asText(), "");
    }

    @Override
    public String getAccessTokenEndpoint() {
        return "http://localhost:3000/oauth/token";
    }

    @Override
    public String getAuthorizationUrl(OAuthConfig oAuthConfig) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }
}
