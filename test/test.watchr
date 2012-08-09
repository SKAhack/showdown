# encoding: utf-8
# Run me with:
#   $ watchr test.watchr

# --------------------------------------------------
# Rules
# --------------------------------------------------
watch( '^test.*/.*\.js'                 )  { |m| run_test }
watch( '^test.*/cases/.*\.html'                 )  { |m| run_test }
watch( '^test.*/cases/.*\.md'                 )  { |m| run_test }
watch( '^src/(.*)\.js'                      )  { |m| run_test }

# --------------------------------------------------
# Helpers
# --------------------------------------------------
def run_test
  run "mocha test/run.js"
end

def run( cmd )
  puts   cmd
  system cmd
end

# vim:ft=ruby
