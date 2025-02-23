package com.hiddengem.eventservice;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test") // This ensures the test-specific properties are used
class HiddengemBackendApplicationTests {

    @Test
    void contextLoads() {
    }
}