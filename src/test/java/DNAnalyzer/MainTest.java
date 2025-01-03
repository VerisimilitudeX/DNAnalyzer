/*
 * Copyright © 2025 Piyush Acharya. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */

package DNAnalyzer;

import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;

/**
 * Tests the main class.
 *
 * @version 1.0.0
 */
class MainTest {
  @Test

  /**
   * Tests if the main class exists.
   *
   * @throws ClassNotFoundException if the class does not exist
   */
  void mainClassshouldExist() throws ClassNotFoundException {
    Class.forName("DNAnalyzer.Main");
    assertTrue(true);
  }
}
